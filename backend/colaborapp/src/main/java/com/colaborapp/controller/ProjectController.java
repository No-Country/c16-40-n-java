package com.colaborapp.controller;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.service.AuthService;
import com.colaborapp.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.HttpStatus.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final AuthService authService;

    @GetMapping()
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        List<ProjectResponseDTO> projectResponseDTOList = projectService.getAllProjects();
        return ResponseEntity.status(OK).body(projectResponseDTOList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable Long id) {
        ProjectResponseDTO projectResponseDTO = projectService.getProjectById(id);
        return ResponseEntity.status(OK).body(projectResponseDTO);
    }

    @PostMapping()
    public ResponseEntity<ProjectResponseDTO> createProject(@RequestBody ProjectRequestDTO projectRequestDTO,
                                                            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String token) {
        String loggedUserData = authService.getCurrentUserFromToken(token);
        ProjectResponseDTO projectResponseDTO = projectService.createProject(loggedUserData, projectRequestDTO);
        return ResponseEntity.status(CREATED).body(projectResponseDTO);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.status(NO_CONTENT).build();
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@PathVariable Long id,
                                                 @RequestBody ProjectRequestDTO projectRequestDTO) {
        ProjectResponseDTO projectResponseDTO = projectService.updateProject(id, projectRequestDTO);
        return ResponseEntity.status(OK).body(projectResponseDTO);
    }
}
