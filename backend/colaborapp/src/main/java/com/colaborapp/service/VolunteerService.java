package com.colaborapp.service;

import com.colaborapp.model.Project;
import com.colaborapp.model.User;

public interface VolunteerService {
    void createVolunteer(User userVolunteer, Project project);
}
