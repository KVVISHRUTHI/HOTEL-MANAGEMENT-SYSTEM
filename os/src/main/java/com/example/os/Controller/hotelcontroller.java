package com.example.os.Controller;

import com.example.os.Entity.hotel;
import com.example.os.Service.hotelservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
public class hotelcontroller {

    @Autowired
    private hotelservice service;

    @PostMapping
    public hotel save(@RequestBody hotel hotel) {
        return service.save(hotel);
    }

    @GetMapping
    public List<hotel> getAll() {
        return service.getAll();
    }
}