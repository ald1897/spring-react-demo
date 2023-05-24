package com.springreact.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;

    // get name
    public String getName() {
        return this.name;
    }

    // get this email
    public String getEmail() {
        return this.email;
    }

    // get this id
    public Long getId() {
        return this.id;
    }
    // do the same thing for setters
    public void setName(String name) {
        this.name = name;
    }
    // again for email
    public void setEmail(String email) {
        this.email = email;
    }

}