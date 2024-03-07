package com.colaborapp.controller;

import com.colaborapp.dto.DonationRequestDTO;
import com.colaborapp.dto.DonationResponseDTO;
import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.service.ProjectService;
import com.colaborapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;

    @PostMapping(value = "/donate/{id}")
    public ResponseEntity<DonationResponseDTO> donate(@PathVariable("id") Long projectId,
                                                      @Valid @RequestBody DonationRequestDTO request) {
        return ResponseEntity.status(CREATED).body(userService.performDonation(projectId, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable Long id) {
        ProjectResponseDTO response = projectService.fetchProjectData(id);
        return ResponseEntity.status(OK).body(response);
    }

    @PostMapping()
    public ResponseEntity<ProjectResponseDTO> createProject(@Valid @RequestBody ProjectRequestDTO request) {
        ProjectResponseDTO response = projectService.createProject(request);
        return ResponseEntity.status(CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteUserOwnedProject(id);
        return ResponseEntity.status(NO_CONTENT).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@PathVariable Long id, @RequestBody ProjectRequestDTO request) {
        ProjectResponseDTO response = projectService.updateProject(id, request);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects(@RequestParam(required = false) String category) {
        return ResponseEntity.status(OK).body(projectService.listProjectsByCategory(category));
    }
}
