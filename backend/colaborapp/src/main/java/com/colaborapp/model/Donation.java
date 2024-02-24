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
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "USER_ID")
    private Long userId;
    @Column(nullable = false, name = "PROJECT_ID")
    private Long projectId;
    @Column(nullable = false)
    private Integer amount;
    @Column(nullable = false)
    private LocalDate date;
}
