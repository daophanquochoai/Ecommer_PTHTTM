package com.doctorhoai.knn.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Slf4j
@Service
public class KNNAlgorithm {

    public double knn(  int k, double[] targetUser, ArrayList<Double[]> users, int targetIndex ){
        ArrayList<Integer>  nearestIndices  = new ArrayList<>();
        ArrayList<Float> coefficients = new ArrayList<>();

        for( int i = 0 ; i <  users.size(); i++ ){
            double[] temp = Arrays.stream(users.get(i)).mapToDouble(Double::doubleValue).toArray();
            Float coeff = correlationCoefficient(temp, targetUser,  targetUser.length, targetIndex);
            int j;
            for( j = 0 ; j < nearestIndices.size() ; j++){
                if( coeff < coefficients.get(j)){
                    break;
                }
            }
            nearestIndices.add(j,i);
            coefficients.add(j, coeff);

            if( nearestIndices.size() > k ){
                nearestIndices.remove(nearestIndices.size() - 1);
                coefficients.remove(coefficients.size()-1);
            }
        }

        double  denominator = 0;
        double   numerator = 0;
        for( int i =  0 ; i < nearestIndices.size()  ; i++ ){
            Double[] neighbor = users.get(nearestIndices.get(i));
            if( neighbor[targetIndex] > 0){
                double sim  = coefficients.get(i);
                denominator += sim;
                numerator += sim * neighbor[targetIndex];
            }
        }

        if( denominator == 0) return 0;
        double result  = numerator /  denominator;

        return result;
    }

    public Double[] normalizeRatings(  double[] ratings ){
        double sum = 0;
        int count = 0;
        for( double  rating :  ratings  ){
            if( rating > 0 ){
                sum  += rating;
                count++;
            }
        }
        Double avg = count > 0 ? sum/count: 0;

        Double[] normalized = new  Double[ratings.length];
        for( int i = 0 ; i < ratings.length ; i++){
            if( ratings[i] > 0 ){
                normalized[i] = Math.max(ratings[i]-avg, 0.1);
            }else {
                normalized[i] = (double) 0;
            }
        }
        return normalized;
    }

    public static float correlationCoefficient(double X[], double Y[], int n, int itemIndex) {
        //initial the variable
        double sumX = 0;
        double sumY = 0;
        double sumXY = 0;
        double squareSumX = 0;
        double squaresumY = 0;

        for (int i = 0; i < n; i++) {
            // Only consider overlapping ratings
            if (X[i] != 0 && Y[i] != 0 && i != itemIndex) {
                // this is sum of elements of array X.
                sumX = sumX + X[i];

                // this is sum of elements of array Y.
                sumY = sumY + Y[i];

                //This is sum of X[i] * Y[i].
                sumXY = sumXY + X[i] * Y[i];

                //This is sum of square of array elements.
                squareSumX = squareSumX + X[i] * X[i];
                squaresumY = squaresumY + Y[i] * Y[i];
            }
        }
        float corr = (Math.sqrt((n * squareSumX - sumX * sumX) * (n * squaresumY - sumY * sumY))) == 0 ? 0 :  (float) (n * sumXY - sumX * sumY) / (float) (Math.sqrt((n * squareSumX - sumX * sumX) * (n * squaresumY - sumY * sumY)));
        return corr;
    }
//    public static void main(String[] args) {
//        ArrayList<Integer[]> userRatings = new ArrayList<>();
//        ArrayList<Double[]> normalizedRate = new ArrayList<>();
//        List<Product> productList = productRepository.getProductByDeleted(false);
//        List<Users>  usersList  =  userRepository.getAllUserRating();
//        usersList.forEach( user -> {
//            Integer[] rated = new Integer[productList.size()];
//            user.getRate().forEach( r -> {
//                rated[productList.indexOf(r.getProduct())] = r.getStar().intValue();
//            });
//            userRatings.add(rated);
//        });
//
//        for( Integer[] rate : userRatings ){
//            normalizedRate.add(
//                    normalizeRatings(Arrays.stream(rate).mapToDouble(value -> value*1.0).toArray())
//            );
//        }
//
//        int userPre = 1;
//        ArrayList<Double> predictions = new ArrayList<>();
//        ArrayList<Integer> bestIndices = new ArrayList<>();
//
//        ArrayList<Double[]> temp = new ArrayList<>(normalizedRate);
//
//        temp.remove(userPre);
//        Double[] user = normalizedRate.get(userPre);
//
//        outer : for( int i = 0 ; i < user.length ; i++ ){
//            if (user[i] == 0) {
//                double[] temp2=Arrays.stream(user).mapToDouble(value -> value * 1.0).toArray();
//                //get the prediction from KNN
//                double prediction = knn(4, temp2, temp, i);
//                for (int j = 0; j < predictions.size(); j++) {
//                    if (prediction > predictions.get(j)) {
//                        predictions.add(j, prediction);
//                        bestIndices.add(j, i);
//                        //if prediction is greater than 3
//                        if (predictions.size() > 3) {
//                            predictions.remove(predictions.size() - 1);
//                            bestIndices.remove(bestIndices.size() - 1);
//                        }
//                        continue outer;
//                    }
//                }
//                predictions.add(prediction);
//                bestIndices.add(i);
//
//            }
//        }
//        System.out.println("Recommend for user :" + userPre + predictions.toString());
//    }
}
