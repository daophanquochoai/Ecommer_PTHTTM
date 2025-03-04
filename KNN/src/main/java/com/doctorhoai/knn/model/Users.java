package com.doctorhoai.knn.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table( name = "users")
public class Users {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column( name = "user_id")
    private Integer user_id;
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "user_id")
    @JsonIgnore
    private List<comment> rate;
}
