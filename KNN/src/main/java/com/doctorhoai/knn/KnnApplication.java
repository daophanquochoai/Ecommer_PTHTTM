package com.doctorhoai.knn;

import com.doctorhoai.knn.service.Inter.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class KnnApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(KnnApplication.class, args);
    }
    private final ProductService productService;
    @Override
    public void run(String... args) throws Exception {
        productService.saveProductTxt();
    }
}
