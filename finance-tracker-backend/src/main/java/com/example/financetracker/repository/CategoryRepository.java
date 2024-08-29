package com.example.financetracker.repository;

import com.example.financetracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    // Custom query methods can be added here if needed
}
