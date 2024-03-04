package com.colaborapp.controller;

import com.colaborapp.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Secured({"ROLE_ADMIN"})
@RequestMapping(value = "/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final ProjectService projectService;

    @DeleteMapping(value = "/projects/{projectId}")
    public ResponseEntity<Void> takeDownUserProject(@PathVariable Long projectId) {
        projectService.deleteUserProject(projectId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

