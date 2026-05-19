package com.example.os.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.os.Entity.room;
import com.example.os.Service.roomservice;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "*")
public class roomcontroller {

    @Autowired
    private roomservice service;

    @PostMapping
    public room save(@RequestBody room room) {
        return service.save(room);
    }

    @GetMapping
    public List<room> getAll() {
        return service.getAll();
    }
}