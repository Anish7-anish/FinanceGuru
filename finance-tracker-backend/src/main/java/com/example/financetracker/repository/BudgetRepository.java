package com.example.financetracker.repository;

import com.example.financetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface BudgetRepository extends JpaRepository<Budget, UUID> {
    // Custom query methods can be added here if needed
}
