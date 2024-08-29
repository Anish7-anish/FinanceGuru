package com.example.financetracker.repository;

import com.example.financetracker.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    // Custom query methods can be added here if needed
}
