package com.example.os.Service;

import com.example.os.Entity.Booking;
import com.example.os.Repository.bookingrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class bookingservice {

    @Autowired
    private bookingrepository repository;

    public Booking save(Booking booking) {
        booking.setBookingStatus("CONFIRMED");
        return repository.save(booking);
    }

    public List<Booking> getAll() {
        return repository.findAll();
    }
}