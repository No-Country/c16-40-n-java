package com.colaborapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.Objects;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE colaborapp.project SET status='DELETED' WHERE id=?")
@SQLRestriction(value = "status <> 'DELETED'")
public class Project {
    // Getters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "CREATOR_ID")
    private User creator;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "CATEGORY_ID")
    private Category category;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String image;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;
    @Column(nullable = false, name = "GOAL_AMOUNT")
    private Double goalAmount;
    @Column(name = "CURRENT_AMOUNT")
    private Double currentAmount;
    @Column(name = "START_DATE")
    private LocalDate startDate;
    @Column(nullable = false, name = "END_DATE")
    private LocalDate endDate;

    // Setters
    public void setCreator(User creator) {
        if (Objects.nonNull(creator)) {
            this.creator = creator;
        }
    }

    public void setCategory(Category category) {
        if (Objects.nonNull(category)) {
            this.category = category;
        }
    }

    public void setTitle(String title) {
        if (Objects.nonNull(title) && !Objects.equals(title, this.title) && !title.trim().isEmpty()) {
            this.title = title;
        }
    }

    public void setStatus(Status status) {
        if (Objects.nonNull(status)) {
            this.status = status;
        }
    }

    public void setImage(String image) {
        if (Objects.nonNull(image) && !Objects.equals(image, this.image) && !image.trim().isEmpty()) {
            this.image = image;
        }
    }

    public void setDescription(String description) {
        if (Objects.nonNull(description) && !Objects.equals(description, this.description) &&
                !description.trim().isEmpty()) {
            this.description = description;
        }
    }

    public void setGoalAmount(Double goalAmount) {
        if (Objects.nonNull(goalAmount) && !Objects.equals(goalAmount, this.goalAmount) &&
                goalAmount > this.goalAmount && goalAmount > currentAmount) {
            this.goalAmount = goalAmount;
        }
    }

    public void setCurrentAmount(Double currentAmount) {
        if (Objects.nonNull(currentAmount) && !Objects.equals(currentAmount, this.currentAmount) &&
                currentAmount >= 0 && currentAmount <= goalAmount) {
            this.currentAmount = currentAmount;
        }
    }

    public void setStartDate(LocalDate startDate) {
        if (Objects.nonNull(startDate)) {
            this.startDate = startDate;
        }
    }

    public void setEndDate(LocalDate endDate) {
        if (Objects.nonNull(endDate)) {
            if (endDate.isBefore(this.startDate)) {
                throw new DateTimeException("End date is before start date. Please, make sure end date is after.");
            }
            if ((endDate.isEqual(this.startDate))) {
                throw new DateTimeException("End date and Start date are same date. Please, make sure end date is after.");
            }
            if (endDate.isBefore(LocalDate.now()) || endDate.isEqual(LocalDate.now())) {
                throw new DateTimeException(("End date can't be equal or before the current date."));
            }
            this.endDate = endDate;
        }
    }
}
