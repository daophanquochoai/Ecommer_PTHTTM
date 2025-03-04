package com.doctorhoai.knn.dto.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class request {
    private String productTitle;
    private Integer userId;
}
