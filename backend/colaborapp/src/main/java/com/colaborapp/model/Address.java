package com.colaborapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Province province;
    @Column(nullable = false)
    private String city;
    private String street;
    private int number;
    @OneToOne(mappedBy = "address")
    private Project project;

    // Setters
    public void setProvince(Province province) {
        if (Objects.nonNull(province)) {
            this.province = province;
        }
    }

    public void setCity(String city) {
        if (Objects.nonNull(city) && !city.trim().isEmpty()) {
            this.city = city;
        }
    }

    public void setStreet(String street) {
        if (Objects.nonNull(street) && !street.trim().isEmpty()) {
            this.street = street;
        }
    }

    public void setNumber(int number) {
        if (number >= 1) {
            this.number = number;
        }
    }
}
