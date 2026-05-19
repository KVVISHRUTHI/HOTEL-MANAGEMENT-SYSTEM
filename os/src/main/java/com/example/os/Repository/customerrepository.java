package com.example.os.Repository;

import com.example.os.Entity.customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface customerrepository extends JpaRepository<customer, Long> {
}