package com.doctorhoai.knn.controller;

import com.doctorhoai.knn.dto.ProductDto;
import com.doctorhoai.knn.model.Product;
import com.doctorhoai.knn.service.Inter.ProductService;
import com.doctorhoai.knn.util.TFIDFAlgorithm;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;
    private final TFIDFAlgorithm tfidfAlgorithm;

    @PostMapping
    public ResponseEntity<?> getProuctAll(
            @RequestBody Integer id
    ) throws IOException {
        List<ProductDto> productList = productService.getAllProduct();
        List<ProductDto>  recommend  = tfidfAlgorithm.contentBaseRecommendations(productList, id, 5);
        return ResponseEntity.ok(recommend);
    }
}
