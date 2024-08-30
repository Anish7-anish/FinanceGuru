package com.example.financetracker.service;

import com.example.financetracker.model.User;
import com.example.financetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public ResponseEntity<String> registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    public ResponseEntity<String> authenticateUser(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            return ResponseEntity.ok("Login successful.");
        }
        return ResponseEntity.status(401).body("Invalid username or password.");
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
