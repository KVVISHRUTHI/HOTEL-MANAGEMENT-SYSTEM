package com.example.os.Service;

import com.example.os.Entity.cancellation;
import com.example.os.Repository.cancellationrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class cancellationservice {

    @Autowired
    private cancellationrepository Repository;

    public cancellation save(cancellation cancellation) {
        return Repository.save(cancellation);
    }

    public List<cancellation> getAll() {
        return Repository.findAll();
    }
}