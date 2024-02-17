package com.colaborapp.repository;

import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @NotNull Optional<Project> findById(@NotNull Long projectId);
}
