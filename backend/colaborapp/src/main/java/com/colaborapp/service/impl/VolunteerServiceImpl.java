package com.colaborapp.service.impl;

import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import com.colaborapp.model.User;
import com.colaborapp.model.Volunteer;
import com.colaborapp.repository.VolunteerRepository;
import com.colaborapp.service.ProjectService;
import com.colaborapp.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor(onConstructor_ = @Lazy)
public class VolunteerServiceImpl implements VolunteerService {
    private final VolunteerRepository volunteerRepository;
    private final ProjectService projectService;

    @Override
    public void createVolunteer(User userVolunteer, Project project) {
        if (Objects.isNull(userVolunteer) || Objects.isNull(project)) {
            throw new RuntimeException("Invalid request. Provide valid data to be volunteer."); // TODO: change me
        }
        if (!project.getStatus().equals(Status.ACTIVE) || project.getEndDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("This project is no longer active."); // TODO: change me
        }
        if (volunteerRepository.existsByUserAndProject(userVolunteer, project)) {
            throw new RuntimeException("You are already a volunteer in this project."); // TODO: change me
        }
        Volunteer volunteer = Volunteer.builder().user(userVolunteer).project(project).build();
        volunteerRepository.save(volunteer);
    }

    @Override
    public List<String> getProjectVolunteers(Long projectId) {
        Project project = projectService.getProjectEntityById(projectId);
        return project.getVolunteers().stream().map(volunteer -> volunteer.getUser().getFullName()).toList();
    }
}
