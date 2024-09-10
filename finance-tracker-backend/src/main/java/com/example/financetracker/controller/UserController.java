package com.example.financetracker.controller;

import com.example.financetracker.model.PasswordValidationRequest;
import com.example.financetracker.model.User;
import com.example.financetracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        return userService.authenticateUser(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // New endpoint for updating user profile
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable UUID id, @RequestBody User userDetails) {
        return userService.updateUser(id, userDetails)
                .map(updatedUser -> ResponseEntity.ok().body(updatedUser))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/validate-password")
    public ResponseEntity<String> validatePassword(@RequestBody PasswordValidationRequest request) {
        boolean isValid = userService.validatePassword(request.getUserId(), request.getPassword());
        if (isValid) {
            return ResponseEntity.ok("Password is valid.");
        } else {
            return ResponseEntity.status(401).body("Invalid password.");
        }
    }
}
