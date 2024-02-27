package com.colaborapp.controller;

import com.colaborapp.dto.UserRequestDTO;
import com.colaborapp.dto.VolunteerRequestDTO;
import com.colaborapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/registration")
    public ResponseEntity<Void> registration(@Valid @RequestBody UserRequestDTO request) {
        userService.userRegistration(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping(value = "/volunteer")
    public ResponseEntity<Void> breVolunteer(@RequestBody @Valid VolunteerRequestDTO request) {
        userService.beProjectVolunteer(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
