package com.doctorhoai.knn.service.Impl;

import com.doctorhoai.knn.dto.ProductDto;
import com.doctorhoai.knn.model.Product;
import com.doctorhoai.knn.repository.ProductRepository;
import com.doctorhoai.knn.service.Inter.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@EnableScheduling
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    @Override
    public List<ProductDto> getAllProduct() {
        List<Product> productSaved = productRepository.getProductByDeleted(false);
        List<ProductDto> productDtoList = new ArrayList<>();
        productSaved.stream().forEach(  item -> {
            String[] urls = new String[4];
            try{
                ObjectMapper objectMapper = new ObjectMapper();
                urls = objectMapper.readValue(item.getImage_url(), String[].class);
            }catch ( Exception ex  ){
                log.error(ex.getMessage());
            }

            productDtoList.add(
                    ProductDto.builder()
                            .productId(item.getProductId())
                            .productTitle(item.getProductTitle())
                            .image_url(urls[0] == null ? "" : urls[0])
                            .price_unit(item.getPrice_unit())
                            .price_new( item.getDiscount() ==  null ? item.getPrice_unit() : item.getPrice_unit() * item.getDiscount() )
                            .build()
            );
        });
        return productDtoList;
    }

    @Override
    public List<Product> getFindAll() {
        return productRepository.findAll();
    }

    @Override
    @Scheduled(cron = "0 0 0 * * ?")
    public void saveProductTxt() {
        List<Product> productList = productRepository.getProductByDeleted(false);

        String path = "src/main/resources/dataset/product";
        try(
                BufferedWriter writer = new BufferedWriter(new FileWriter(path, false))
                ) {
            for( Product product : productList ){
                writer.write(product.getProductTitle());
                writer.newLine();
                    if( product.getProductDescription() != null ){
                        writer.write(product.getProductDescription());
                        writer.newLine();
                    }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e ){
            e.printStackTrace();
        }
    }
}
