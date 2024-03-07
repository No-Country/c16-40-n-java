package com.colaborapp.service;

import com.colaborapp.model.Project;
import com.colaborapp.model.User;

import java.util.List;

public interface VolunteerService {
    void createVolunteer(User userVolunteer, Project project);

    List<String> getProjectVolunteers(Long projectId);
}
