package com.springreact.demo.controller;

import com.springreact.demo.model.PersonalFinanceData;
import com.springreact.demo.repository.PersonalFinanceDataRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/personalFinanceData")
public class PersonalFinanceDataController {

    private final PersonalFinanceDataRepository personalFinanceDataRepository;

    public PersonalFinanceDataController(PersonalFinanceDataRepository personalFinanceDataRepository) {
        this.personalFinanceDataRepository = personalFinanceDataRepository;
    }

    @GetMapping
    public List<PersonalFinanceData> getAllPersonalFinanceData() {
        return personalFinanceDataRepository.findAll();
    }

    @GetMapping("/{id}")
    public PersonalFinanceData getPersonalFinanceData(@PathVariable Long id) {
        return personalFinanceDataRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createPersonalFinanceData(@RequestBody PersonalFinanceData personalFinanceData) throws URISyntaxException {
        PersonalFinanceData savedPersonalFinanceData = personalFinanceDataRepository.save(personalFinanceData);
        return ResponseEntity.created(new URI("/personalFinanceData/" + savedPersonalFinanceData.getId())).body(savedPersonalFinanceData);
    }

    @PutMapping("/{id}")
    public ResponseEntity updatePersonalFinanceData(@PathVariable Long id, @RequestBody PersonalFinanceData personalFinanceData) {
        PersonalFinanceData currentPersonalFinanceData = personalFinanceDataRepository.findById(id).orElseThrow(RuntimeException::new);
        currentPersonalFinanceData.setAccountName(personalFinanceData.getAccountName());
        currentPersonalFinanceData.setBalance(personalFinanceData.getBalance());
        currentPersonalFinanceData.setInterestRate(personalFinanceData.getInterestRate());
        currentPersonalFinanceData = personalFinanceDataRepository.save(personalFinanceData);

        return ResponseEntity.ok(currentPersonalFinanceData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity personalFinanceData(@PathVariable Long id) {
        personalFinanceDataRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
