package com.doctorhoai.knn.controller;

import com.doctorhoai.knn.KnnApplication;
import com.doctorhoai.knn.model.Product;
import com.doctorhoai.knn.model.Users;
import com.doctorhoai.knn.service.Inter.ProductService;
import com.doctorhoai.knn.service.Inter.UserService;
import com.doctorhoai.knn.util.KNNAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    private final ProductService productService;
    private final KNNAlgorithm knnAlgorithm;


    @PostMapping
    public ResponseEntity<?> getRecommentsForUser(
            @RequestBody Integer userId
    ){
        int userPre = -1;
        ArrayList<Integer[]> userRatings = new ArrayList<>();
        ArrayList<Double[]> normalizedRate = new ArrayList<>();
        List<Product> productList = productService.getFindAll();
        List<Users>  usersList  =  userService.getAllUser();
        for( int i = 0 ; i < usersList.size() ; i++ ){
            if( usersList.get(i).getUser_id() == userId){
                userPre = i;
            }
        }
        if( userPre == -1){
            log.info("user not found");
            return ResponseEntity.notFound().build();
        }
        usersList.forEach( user -> {
            Integer[] rated = new Integer[productList.size()];
            Arrays.fill(rated,0);
            user.getRate().forEach( r -> {
                int indexProduct = -1;
                for( int i = 0 ; i < productList.size() ; i++ ){
                    if( productList.get(i).getProductId().equals(r.getProduct().getProductId())){
                        indexProduct = i;
                        break;
                    }
                }
                if( indexProduct == -1 ){
                    log.info("Khong tim thay san pham");
                }
                rated[indexProduct] = r.getStar().intValue();
            });
            userRatings.add(rated);
        });

        for( Integer[] rate : userRatings ){
            normalizedRate.add(
                    knnAlgorithm.normalizeRatings(Arrays.stream(rate).mapToDouble(value -> value*1.0).toArray())
            );
        }
//        for (Integer[] rate : userRatings) {
//            // Chuyển từ Integer[] sang double[] rồi chuyển thành Double[]
//            Double[] normalized = Arrays.stream(rate)             // Chuyển thành Stream<Integer>
//                    .map(value -> value.doubleValue())  // Chuyển Integer thành double// Chuyển từ double thành Double
//                    .toArray(Double[]::new);          // Chuyển thành mảng Double[]
//
//            normalizedRate.add(normalized);
//        }


        ArrayList<Double> predictions = new ArrayList<>();
        ArrayList<Integer> bestIndices = new ArrayList<>();

        ArrayList<Double[]> temp = new ArrayList<>(normalizedRate);

        temp.remove(userPre);
        Double[] user = normalizedRate.get(userPre);
        outer : for( int i = 0 ; i < user.length ; i++ ){
            if (user[i] == 0) {
                double[] temp2=Arrays.stream(user).mapToDouble(value -> value * 1.0).toArray();
                //get the prediction from KNN
                double prediction = knnAlgorithm.knn(3, temp2, temp, i);
                for (int j = 0; j < predictions.size(); j++) {
                    if (prediction > predictions.get(j)) {
                        predictions.add(j, prediction);
                        bestIndices.add(j, i);
                        //if prediction is greater than 3
                        if (predictions.size() > 3) {
                            predictions.remove(predictions.size() - 1);
                            bestIndices.remove(bestIndices.size() - 1);
                        }
                        continue outer;
                    }
                }
                predictions.add(prediction);
                bestIndices.add(i);

            }
        }

        ArrayList<Integer> firstFive = new ArrayList<>(bestIndices.subList(0, Math.min(5, bestIndices.size())));
        ArrayList<Product> recommend = new ArrayList<>();
        for( int i = 0 ; i <Math.min(5, bestIndices.size()); i++ ){
            recommend.add(productList.get(firstFive.get(i)));
        }
        return ResponseEntity.ok(
                recommend
        );
    }

}
