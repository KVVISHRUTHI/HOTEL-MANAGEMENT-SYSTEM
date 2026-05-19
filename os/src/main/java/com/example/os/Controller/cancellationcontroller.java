package com.example.os.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.os.Entity.cancellation;
import com.example.os.Service.cancellationservice;

@RestController
@RequestMapping("/cancellations")
@CrossOrigin(origins = "*")
public class cancellationcontroller {

    @Autowired
    private cancellationservice service;

    @PostMapping
    public cancellation save(@RequestBody cancellation cancellation) {
        return service.save(cancellation);
    }

    @GetMapping
    public List<cancellation> getAll() {
        return service.getAll();
    }
}