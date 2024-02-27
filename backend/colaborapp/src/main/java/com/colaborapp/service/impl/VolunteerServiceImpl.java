package com.colaborapp.service.impl;

import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import com.colaborapp.model.User;
import com.colaborapp.model.Volunteer;
import com.colaborapp.model.exception.RequiredObjectException;
import com.colaborapp.repository.VolunteerRepository;
import com.colaborapp.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class VolunteerServiceImpl implements VolunteerService {
    private final VolunteerRepository volunteerRepository;

    @Override
    public void createVolunteer(User userVolunteer, Project project) {
        if (Objects.isNull(userVolunteer) || Objects.isNull(project)) {
            throw new RequiredObjectException("Invalid request. Provide valid data to be volunteer.");
        }
        if (!project.getStatus().equals(Status.ACTIVE) || project.getEndDate().isBefore(LocalDate.now())) {
            throw new RequestRejectedException("This project is no longer active.");
        }
        if (volunteerRepository.existsByUserAndProject(userVolunteer, project)) {
            throw new RequestRejectedException("You are already a volunteer in this project.");
        }
        Volunteer volunteer = Volunteer.builder().user(userVolunteer).project(project).build();
        volunteerRepository.save(volunteer);
    }
}
