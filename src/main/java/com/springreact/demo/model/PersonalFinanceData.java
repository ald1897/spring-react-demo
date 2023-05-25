package com.springreact.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "personalFinanceData")
public class PersonalFinanceData {

    @Id
    @GeneratedValue
    private Long id;
    private String accountName;
    private Long balance;
    private Double interestRate;

    public Long getId() {
        return this.id;
    }
    public String getAccountName() {
        return this.accountName;
    }
    public Long getBalance() {
        return this.balance;
    }
    public Double getInterestRate() {
        return this.interestRate;
    }
    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }
    public void setBalance(Long balance) {
        this.balance = balance;
    }
    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }
}