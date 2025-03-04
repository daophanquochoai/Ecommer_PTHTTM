package com.doctorhoai.knn.dto;

import com.doctorhoai.knn.model.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
public class RateDto {
    private BigDecimal  rate;
    private Product product;
}
