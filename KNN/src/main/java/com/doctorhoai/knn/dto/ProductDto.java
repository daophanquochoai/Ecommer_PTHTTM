package com.doctorhoai.knn.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
@AllArgsConstructor
public class ProductDto {
    private Integer productId;
    private String productTitle;
    private String image_url;
    private Integer price_unit;
    private Integer price_new;
}
