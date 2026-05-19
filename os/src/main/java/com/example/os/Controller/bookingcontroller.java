package com.example.os.Controller;

import com.example.os.Entity.booking;
import com.example.os.Service.bookingservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")

public class bookingcontroller {

    @Autowired
    private bookingservice service;

    @PostMapping
    public booking save(@RequestBody booking booking) {
        return service.save(booking);
    }

    @GetMapping
    public List<booking> getAll() {
        return service.getAll();
    }
}