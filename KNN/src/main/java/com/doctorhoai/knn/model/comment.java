package com.doctorhoai.knn.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "comment")
public class comment {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer comment_id;
    @Column(name = "star")
    private BigDecimal star;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user_id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;
}
