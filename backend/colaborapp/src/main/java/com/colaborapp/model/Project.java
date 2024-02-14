package com.colaborapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "USER_ID")
    private Long userId;
    @Column(nullable = false, name= "CATEGORY_ID")
    private Long categoryId;
    @Column(nullable = false, unique = true)
    private String title;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false, name= "GOAL_AMOUNT")
    private Integer goalAmount;
    @Column(nullable = false, name= "CURRENT_AMOUNT")
    private Integer currentAmount;
    @Column(nullable = false, name= "START_DATE")
    private LocalDate startDate;
    @Column(nullable = false, name= "END_DATE")
    private LocalDate endDate;
}
