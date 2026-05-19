package com.example.os.Repository;

import com.example.os.Entity.hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface hotelrepository extends JpaRepository<hotel, Long> {
}