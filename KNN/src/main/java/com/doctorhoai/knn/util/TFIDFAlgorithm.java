package com.doctorhoai.knn.util;

import com.doctorhoai.knn.dto.ProductDto;
import javafx.util.Pair;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import opennlp.tools.chunker.ChunkerME;
import opennlp.tools.postag.POSTaggerME;
import opennlp.tools.util.Span;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Slf4j
@Service
//@RequiredArgsConstructor
public class TFIDFAlgorithm {
    private ChunkerME chunker;
    private POSTaggerME tagger;
    private String determiners_en = "the, a, an, this, that, these, those," +
            " my, your, his, her, its, our, their, much, many, few, most, some, any, enough, all," +
            " both, half, either, neither, each, every, other, another, such, what, rather, quite";
    private TFIDF tfidf;
    TFIDFAlgorithm() {
        try{
            System.out.println("------------------Loading----------------------");
            String filePath = "src/main/resources/dataset/product";
            Pair<String, String> next = null;
            try {
                File file = new File(filePath);
                String fileAsString = FileUtils.readFileToString(file, "UTF-8");
                next = new Pair(file.getName(), fileAsString);
            } catch (IOException e) {
                e.printStackTrace();
            }
            this.tfidf = new TFIDF(next);
            System.out.println("-----------------Success----------------------");
        }catch (Exception e ){
            e.printStackTrace();
        }

    }
    public List<ProductDto> contentBaseRecommendations(List<ProductDto> trainData, Integer productId, int topN ){
        // find the target product
        ProductDto targetProduct = trainData.stream().filter( item -> item.getProductId().equals(productId))
                .findFirst().orElse(null);
        if( targetProduct == null){
            log.error("Product not found");
            throw new RuntimeException("Product not found");
        }
        //create td idf matrix for the product name
        Map<String, Double> targetProductVector = generateTfidfVector(targetProduct.getProductTitle(), trainData);

        List<Map.Entry<ProductDto, Double>> similarities = new ArrayList<>();
        for( ProductDto product : trainData ){
            if( !product.getProductTitle().equals(targetProduct.getProductTitle())){
                Map<String, Double> productVector = generateTfidfVector(product.getProductTitle(), trainData);
                double similarity = cosineSimilarity(targetProductVector, productVector);
                similarities.add(new AbstractMap.SimpleEntry<>(product, similarity));
            }
        }

        similarities.sort( (a,b) -> Double.compare(b.getValue(), a.getValue()));
        similarities.stream().forEach(item -> System.out.println(item.getValue()));
        return similarities.stream().limit(topN).filter(item-> item.getValue()>0.3)
                .map(Map.Entry::getKey).collect(Collectors.toList());
    }

    private Map<String, Double> generateTfidfVector( String name, List<ProductDto> trainData){
        Map<String, Double> tfidfVector = new HashMap<>();
//        String[] words = name.split("\\s+");
//        int totalDocs = trainData.size();
//        Map<String, Integer> termFrequency = new HashMap<>();
//        for( String  word : words ){
//            word = word.toLowerCase().replaceAll("[^a-zA-Z]","");
//            if( !word.isEmpty() ){
//                termFrequency.put(word, termFrequency.getOrDefault(word,  0)  +  1);
//            }
//        }

        String[] wordList = tfidf.cleanSplitTextAndPunc(name);
//        String[] tags = tfidf.tagger.tag(wordList);
//        Span[] spanResults = tfidf.chunker.chunkAsSpans(wordList, tags);
//        for (Span span : spanResults) {
//            if(span.getType().equals("NP")) {
//                StringBuilder sb = new StringBuilder();
//                for(int i = span.getStart(); i < span.getEnd() ; i++ ) {
//                    if(i == span.getStart() && this.determiners_en.contains(wordList[i] + ","))
//                        continue;
//
//                    sb.append(wordList[i]).append(" ");
//                }
//
//                String phrase = sb.toString().trim();
//                tfidfVector.put(phrase, tfidf.getTFIDF( phrase) );
//            }
//        }

        for( String word  : wordList){
//            int dotCount =  0;
//            for( ProductDto product : trainData ){
//                if( product.getProductTitle().toLowerCase().contains(word) ){
//                    dotCount++;
//                }
//            }
//            double  idf  = Math.log( (double) totalDocs / (dotCount + 1));
            tfidfVector.put(word, tfidf.getTFIDF( word) );
        }

        return tfidfVector;
    }
    private double cosineSimilarity(Map<String, Double> vectorA, Map<String, Double> vectorB){
        Set<String> allWords = new HashSet<>();
        allWords.addAll(vectorA.keySet());
        allWords.addAll(vectorB.keySet());

        double dotProduct = 0.0;
        double magnitudeA = 0.0;
        double magnitudeB = 0.0;

        for( String word : allWords ){
            double valueA = vectorA.getOrDefault(word, 0.0);
            double valueB = vectorB.getOrDefault(word,0.0);
            dotProduct += valueA * valueB;
            magnitudeA += valueA * valueA;
            magnitudeB += valueB * valueB;
        }
        return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
    }
}
