package com.doctorhoai.knn.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class UserDto {
    private Integer userId;
    private List<RateDto> rate;
}
