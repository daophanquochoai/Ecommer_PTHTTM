package com.doctorhoai.knn.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table( name = "products")
public class Product {
    @Id
    @Column( name = "product_id")
    private Integer productId;
    @Column( name = "product_title")
    private String productTitle;
    @Column( name = "product_desc")
    private String productDescription;
    @Column( name = "image_url")
    private String image_url;
    @Column( name = "price_unit")
    private Integer price_unit;
    @Column( name = "discount")
    private Integer discount;
    @Column( name = "deleted")
    private Boolean deleted;

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", productTitle='" + productTitle + '\'' +
                ", image_url='" + image_url + '\'' +
                ", price_unit=" + price_unit +
                ", discount=" + discount +
                ", deleted=" + deleted +
                '}';
    }
}
