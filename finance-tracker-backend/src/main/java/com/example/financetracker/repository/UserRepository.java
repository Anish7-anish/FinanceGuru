package com.example.financetracker.repository;

import com.example.financetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    // Custom query methods can be added here if needed
}
