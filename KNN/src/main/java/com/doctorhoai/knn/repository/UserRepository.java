package com.doctorhoai.knn.repository;

import com.doctorhoai.knn.model.Users;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    @Query("SELECT u FROM Users u")
    List<Users> getAllUserRating();

}
