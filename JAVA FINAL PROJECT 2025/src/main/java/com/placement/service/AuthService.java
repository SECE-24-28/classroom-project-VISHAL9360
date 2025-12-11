package com.placement.service;

import com.placement.model.User;
import com.placement.repository.UserRepository;
import com.placement.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public Map<String, Object> register(User user) {
        Map<String, Object> response = new HashMap<>();
        
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return response;
        }
        
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }
        
        userRepository.save(user);
        response.put("success", true);
        response.put("message", "User registered successfully");
        return response;
    }
    
    public Map<String, Object> login(String username, String password) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> userOpt = userRepository.findByUsername(username);
        
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return response;
        }
        
        User user = userOpt.get();
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("username", user.getUsername());
        userData.put("fullName", user.getFullName());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole());
        
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("user", userData);
        
        return response;
    }
}
