package com.example.os.Repository;

import com.example.os.Entity.payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface paymentrepository extends JpaRepository<payment, Long> {
}