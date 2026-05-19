package com.example.os.Repository;

import com.example.os.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface bookingrepository extends JpaRepository<Booking, Long> {
}