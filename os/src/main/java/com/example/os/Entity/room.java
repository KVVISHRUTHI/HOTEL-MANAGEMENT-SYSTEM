package com.example.os.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String roomType;
    private Double price;
    private String status;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private hotel hotel;
}