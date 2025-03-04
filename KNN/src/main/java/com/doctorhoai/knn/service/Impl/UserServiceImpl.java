package com.doctorhoai.knn.service.Impl;

import com.doctorhoai.knn.model.Users;
import com.doctorhoai.knn.repository.UserRepository;
import com.doctorhoai.knn.service.Inter.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private  final UserRepository userRepository;


    @Override
    public List<Users> getAllUser() {
        return userRepository.getAllUserRating();
    }


}
