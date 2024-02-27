package com.colaborapp.repository;

import com.colaborapp.model.Project;
import com.colaborapp.model.User;
import com.colaborapp.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
    boolean existsByUserAndProject(User volunteer, Project project);
}
