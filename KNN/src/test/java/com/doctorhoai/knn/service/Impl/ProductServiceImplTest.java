package com.doctorhoai.knn.service.Impl;

import com.doctorhoai.knn.repository.ProductRepository;
import com.doctorhoai.knn.service.Inter.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ProductServiceImplTest {

    @Autowired
    private ProductService productService;
    @Test
    void getAllProduct() {
        System.out.println(productService.getAllProduct().size());
    }

    @Test
    void getFindAll() {
    }

    @Test
    void saveProductTxt() {
    }
}