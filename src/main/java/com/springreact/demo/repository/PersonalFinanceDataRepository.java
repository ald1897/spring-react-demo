package com.springreact.demo.repository;

import com.springreact.demo.controller.PersonalFinanceDataController;
import com.springreact.demo.model.PersonalFinanceData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalFinanceDataRepository extends JpaRepository<PersonalFinanceData, Long> {
}