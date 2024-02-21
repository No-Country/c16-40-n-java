package com.colaborapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static java.time.LocalDate.now;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "CREATOR_ID")
    private User creator;
    @ManyToOne
    @JoinColumn(nullable = false, name = "CATEGORY_ID")
    private Category category;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false, name= "GOAL_AMOUNT")
    private Double goalAmount;
    @Column(name= "CURRENT_AMOUNT")
    private Double currentAmount = 0.0;
    @Column(name= "START_DATE")
    private LocalDate startDate = now();
    @Column(nullable = false, name= "END_DATE")
    private LocalDate endDate;
}
