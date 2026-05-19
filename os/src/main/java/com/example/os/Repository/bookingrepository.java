package com.example.os.Repository;

import com.example.os.Entity.booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface bookingrepository extends JpaRepository<booking, Long> {
}