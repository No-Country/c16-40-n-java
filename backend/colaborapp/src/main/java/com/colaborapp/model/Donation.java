package com.colaborapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(nullable = false, name = "USER_ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private User donor;
    @JoinColumn(nullable = false, name = "PROJECT_ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private Project project;
    @Column(nullable = false)
    private Double amount;
    @Column(nullable = false)
    private LocalDateTime dateTime;
}
