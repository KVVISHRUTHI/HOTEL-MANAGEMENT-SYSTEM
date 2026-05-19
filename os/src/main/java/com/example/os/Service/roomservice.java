package com.example.os.Service;

import com.example.os.Entity.room;
import com.example.os.Repository.roomrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class roomservice {

    @Autowired
    private roomrepository repository;

    public room save(room room) {
        return repository.save(room);
    }

    public List<room> getAll() {
        return repository.findAll();
    }
}