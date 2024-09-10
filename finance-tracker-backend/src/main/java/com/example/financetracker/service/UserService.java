package com.example.financetracker.service;

import com.example.financetracker.model.User;
import com.example.financetracker.repository.UserRepository;
import com.example.financetracker.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> updateUser(UUID id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            if (userDetails.getUsername() != null && !userDetails.getUsername().isEmpty()) {
                user.setUsername(userDetails.getUsername());
            }
            if (userDetails.getEmail() != null && !userDetails.getEmail().isEmpty()) {
                user.setEmail(userDetails.getEmail());
            }
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }
            return userRepository.save(user);
        });
    }

    public boolean validatePassword(UUID userId, String currentPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(currentPassword, user.getPassword());
        }
        return false;
    }



    public ResponseEntity<String> registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    public ResponseEntity<Map<String, Object>> authenticateUser(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername());  // Generate JWT token

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful.");
            response.put("userId", existingUser.get().getId()); // Include userId in the response
            response.put("token", token);  // Include the JWT token in the response

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password."));
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
