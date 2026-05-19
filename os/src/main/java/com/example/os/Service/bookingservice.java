package com.example.os.Service;

import com.example.os.Entity.booking;
import com.example.os.Repository.bookingrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class bookingservice {

    @Autowired
    private bookingrepository repository;

    public booking save(booking booking) {
        booking.setBookingStatus("CONFIRMED");
        return repository.save(booking);
    }

    public List<booking> getAll() {
        return repository.findAll();
    }
}