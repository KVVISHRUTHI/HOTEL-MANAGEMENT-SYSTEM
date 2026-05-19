package com.example.os.Controller;

import com.example.os.Entity.payment;
import com.example.os.Service.paymentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
public class paymentcontroller {

    @Autowired
    private paymentservice service;

    @PostMapping
    public payment save(@RequestBody payment payment) {
        return service.save(payment);
    }

    @GetMapping
    public List<payment> getAll() {
        return service.getAll();
    }
}