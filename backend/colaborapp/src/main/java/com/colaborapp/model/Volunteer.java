package com.colaborapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(nullable = false, name = "VOLUNTEER_ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
    @JoinColumn(nullable = false, name = "PROJECT_ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private Project project;
}
