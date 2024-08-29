package com.example.financetracker.repository;

import com.example.financetracker.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {
    // Custom query methods can be added here if needed
}
