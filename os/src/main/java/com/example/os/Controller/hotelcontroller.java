package com.example.os.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.os.Entity.hotel;
import com.example.os.Service.hotelservice;

@RestController
@RequestMapping("/hotels")
@CrossOrigin(origins = "*")
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