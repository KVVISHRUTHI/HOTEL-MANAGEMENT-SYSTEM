package com.example.os.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.os.Entity.Booking;
import com.example.os.Service.bookingservice;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")

public class bookingcontroller {

    @Autowired
    private bookingservice service;

    @PostMapping
    public Booking save(@RequestBody Booking booking) {
        return service.save(booking);
    }

    @GetMapping
    public List<Booking> getAll() {
        return service.getAll();
    }
}