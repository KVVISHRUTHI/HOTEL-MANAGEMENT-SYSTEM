package com.example.os.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class cancellation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cancellationId;

    private LocalDate cancellationDate;
    private Double refundAmount;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}