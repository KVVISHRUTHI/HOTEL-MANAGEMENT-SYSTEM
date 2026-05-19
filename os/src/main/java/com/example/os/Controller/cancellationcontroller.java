package com.example.os.Controller;

import com.example.os.Entity.cancellation;
import com.example.os.Service.cancellationservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cancellations")
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