package com.placement.controller;

import com.placement.model.User;
import com.placement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class   UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/by-role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        return ResponseEntity.ok(userRepository.findAll()
                .stream()
                .filter(user -> user.getRole().equals(role))
                .toList());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    if (userDetails.getFullName() != null) user.setFullName(userDetails.getFullName());
                    if (userDetails.getEmail() != null) user.setEmail(userDetails.getEmail());
                    if (userDetails.getPhone() != null) user.setPhone(userDetails.getPhone());
                    if (userDetails.getDepartment() != null) user.setDepartment(userDetails.getDepartment());
                    if (userDetails.getCgpa() != null) user.setCgpa(userDetails.getCgpa());
                    if (userDetails.getCompanyName() != null) user.setCompanyName(userDetails.getCompanyName());
                    if (userDetails.getDesignation() != null) user.setDesignation(userDetails.getDesignation());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
