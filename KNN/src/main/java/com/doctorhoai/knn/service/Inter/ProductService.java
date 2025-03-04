package com.doctorhoai.knn.service.Inter;

import com.doctorhoai.knn.dto.ProductDto;
import com.doctorhoai.knn.model.Product;

import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProduct();
    List<Product> getFindAll();
    void saveProductTxt();
}
