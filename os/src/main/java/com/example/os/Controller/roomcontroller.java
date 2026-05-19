package com.example.os.Controller;

import com.example.os.Entity.room;
import com.example.os.Service.roomservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
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