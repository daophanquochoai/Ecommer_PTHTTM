package com.doctorhoai.knn.util;

import com.doctorhoai.knn.repository.ProductRepository;
import javafx.util.Pair;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import opennlp.tools.chunker.ChunkerME;
import opennlp.tools.chunker.ChunkerModel;
import opennlp.tools.cmdline.postag.POSModelLoader;
import opennlp.tools.postag.POSModel;
import opennlp.tools.postag.POSTaggerME;
import opennlp.tools.tokenize.WhitespaceTokenizer;
import opennlp.tools.util.Span;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Slf4j
public class TFIDF {
    private Map<String, AtomicInteger> corpusBow;
    public ChunkerME chunker;
    public POSTaggerME tagger;
    private WhitespaceTokenizer whitespaceTokenizer = WhitespaceTokenizer.INSTANCE;
    private String determiners_en = "the, a, an, this, that, these, those," +
            " my, your, his, her, its, our, their, much, many, few, most, some, any, enough, all," +
            " both, half, either, neither, each, every, other, another, such, what, rather, quite";
    private final String fileName = "product";

    public TFIDF() throws IOException {
        this(new HashMap<>());
    }

    /**
     *
     * @param corpusBow - Initiate the class with already provided Bag of words (BOW)
     */
    public TFIDF(Map<String, AtomicInteger> corpusBow) throws IOException {
        this.corpusBow = corpusBow;
        initParseAndChunk();
    }

    /**
     *
     * @param dataset - Iterator to go over the dataset
     */
    public TFIDF(Pair<String, String> dataset) throws IOException {
        initParseAndChunk();
        this.corpusBow = fromCorpusToBow(dataset);
    }

    private void initParseAndChunk() throws IOException {
        InputStream inputStream = this.getClass().getResourceAsStream("/en-chunker.bin");
        ChunkerModel chunkerModel = new ChunkerModel(inputStream);
        this.chunker = new ChunkerME(chunkerModel);

        File file = new File(this.getClass().getResource("/en-pos-maxent.bin").getFile());
        POSModel model = new POSModelLoader().load(file);
        this.tagger = new POSTaggerME(model);
    }

    public double getTF(String docName, String term) {
        term = term.toLowerCase();
        final Map<String, AtomicInteger> doc = this.getDoc(docName);
        if(doc != null) {
            double total = 0.0;
            if(isPhrase(term)) {
                for (String key : doc.keySet()) {
                    if (key.equals(term)) {
                        total += doc.get(key).get();
                    } else if (key.contains(term)) {
                        total += doc.get(key).get() / 2.0;
                    }
                }
            } else if(doc.containsKey(term)) {
                total = doc.get(term).get();
            }

            return total / Double.valueOf(doc.size());

        }

        return 0.0;
    }

    public double getIDF(String term) {
        term = term.toLowerCase();
        final int numberOfDocsWithTerm = this.numberOfDocsWithTerm(term);
        if(numberOfDocsWithTerm != 0) {
            return Math.log(Double.valueOf(this.corpusBow.size()) / Double.valueOf(numberOfDocsWithTerm));
        } else {
            return 0;
        }
    }

    public double getTFIDF( String term) {
        return getTF(this.fileName, term) * getIDF(term);
    }

    public Map<String, AtomicInteger> getDoc(String docId) {
        return this.corpusBow;
    }

    public int numberOfDocsWithTerm(String term) {
        int count = 0;
        final boolean nounPhrase = isPhrase(term);
        if(nounPhrase) {
            for (String key : this.corpusBow.keySet()) {
                if(key.contains(term)) {
                    count++;
                    break;
                }
            }
        } else if(this.corpusBow.containsKey(term)) {
            count++;
        }

        return count;
    }

    boolean isPhrase(String term) {
        if (term.split(" ").length > 1) {
            return true;
        }

        return false;
    }

    /**
     *
     * @param corpusToMap - Map for FileName, File text(UTF-8)
     * @return Bag of words for each document (key=doc name) in the corpus, inner map key=word, value=count
     * @throws IOException
     */
    Map<String, AtomicInteger> fromCorpusToBow(Pair<String, String> corpusToMap) {
        Pair<String, String> next = corpusToMap;
        Map<String, AtomicInteger> docBow = convertDocStringToBow(next.getValue());
        return docBow;
    }

    Map<String, AtomicInteger> convertDocStringToBow(String fileAsString) {
        Map<String, AtomicInteger> docBow = new HashMap<>();
        String[] cleanSplitText = cleanSplitTextAndPunc(fileAsString);
        for(String word : cleanSplitText) {
            word = word.replaceAll("\n+", " ").trim();
            if (docBow.containsKey(word)) {
                docBow.get(word).incrementAndGet();
            } else {
                docBow.put(word, new AtomicInteger(1));
            }
        }

        String[] tags = this.tagger.tag(cleanSplitText);
        Span[] spanResults = this.chunker.chunkAsSpans(cleanSplitText, tags);
        for (Span span : spanResults) {
            if(span.getType().equals("NP")) {
                StringBuilder sb = new StringBuilder();
                for(int i = span.getStart(); i < span.getEnd() ; i++ ) {
                    if(i == span.getStart() && this.determiners_en.contains(cleanSplitText[i] + ","))
                        continue;

                    sb.append(cleanSplitText[i]).append(" ");
                }

                String phrase = sb.toString().trim();
                if (docBow.containsKey(phrase)) {
                    docBow.get(phrase).incrementAndGet();
                } else {
                    docBow.put(phrase, new AtomicInteger(1));
                }
            }
        }

        return docBow;
    }

    String[] cleanSplitTextAndPunc(String fileAsString) {
        fileAsString = fileAsString.toLowerCase();
        String cleanString = fileAsString.replaceAll("\\p{Punct}", "");
        String[] words = whitespaceTokenizer.tokenize(cleanString);
        return words;
    }

//    public static void main(String[] args) throws IOException {
//        String filePath = "src/main/resources/dataset/product";
//        Pair<String, String> next = null;
//        try {
//            File file = new File(filePath);
//            String fileAsString = FileUtils.readFileToString(file, "UTF-8");
//            next = new Pair(file.getName(), fileAsString);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        TFIDF tfidf = new TFIDF(next);
//
//        final double ml1 = tfidf.getTFIDF( "realme");
//        System.out.println("TFIDF value for 'Machine Learning': " + ml1);
//    }
}
