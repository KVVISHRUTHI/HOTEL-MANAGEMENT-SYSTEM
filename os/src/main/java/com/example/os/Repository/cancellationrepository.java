package com.example.os.Repository;

import com.example.os.Entity.cancellation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface cancellationrepository extends JpaRepository<cancellation, Long> {
}