package com.colaborapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, name = "LAST_NAME")
    private String lastName;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;
    @Column(nullable = false)
    private String password;
    @JoinColumn(name = "ROLE_ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;
    @Setter
    private boolean enable;
    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
    @SQLRestriction("status <> 'DELETED'")
    private Set<Project> projects;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Volunteer> volunteeringList;

    public String getFullName() {
        return name + ' ' + lastName;
    }

    public Set<Project> getProjects() {
        return Objects.isNull(this.projects) ? new HashSet<>() : this.projects;
    }

    public Set<Volunteer> getVolunteeringList() {
        return Objects.isNull(this.volunteeringList) ? new HashSet<>() : this.volunteeringList;
    }

    public void setName(String name) {
        if (!Objects.equals(name, this.name) && Objects.nonNull(name) && !name.trim().isEmpty()) {
            this.name = name;
        }
    }

    public void setLastName(String lastName) {
        if (!Objects.equals(lastName, this.lastName) && Objects.nonNull(lastName) && !lastName.trim().isEmpty()) {
            this.lastName = lastName;
        }
    }

    public void setEmail(String email) {
        if (!Objects.equals(email, this.email) && Objects.nonNull(email) && !email.trim().isEmpty()) {
            this.email = email;
        }
    }

    public void setPhoneNumber(String phoneNumber) {
        if (!Objects.equals(phoneNumber, this.phoneNumber) && Objects.nonNull(phoneNumber) && !phoneNumber.trim().isEmpty()) {
            this.phoneNumber = phoneNumber;
        }
    }

    public void setPassword(String password) {
        if (Objects.nonNull(password) && !password.trim().isEmpty()) {
            this.password = password;
        }
    }

    public void setRole(Role role) {
        if (Objects.nonNull(role)) {
            this.role = role;
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, lastName, email, phoneNumber, password, role, enable);
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String name;
        private String lastName;
        private String email;
        private String phoneNumber;
        private String password;
        private Role role;
        private boolean enable;

        public UserBuilder id(Long id) {
            if (Objects.nonNull(id)) {
                this.id = id;
            }
            return this;
        }

        public UserBuilder name(String name) {
            if (Objects.nonNull(name) && !name.trim().isEmpty()) {
                this.name = name;
            }
            return this;
        }

        public UserBuilder lastName(String lastName) {
            if (Objects.nonNull(lastName) && !lastName.trim().isEmpty()) {
                this.lastName = lastName;
            }
            return this;
        }

        public UserBuilder email(String email) {
            if (Objects.nonNull(email) && !email.trim().isEmpty()) {
                this.email = email;
            }
            return this;
        }

        public UserBuilder phoneNumber(String phoneNumber) {
            if (Objects.nonNull(phoneNumber) && !phoneNumber.trim().isEmpty()) {
                this.phoneNumber = phoneNumber;
            }
            return this;
        }

        public UserBuilder password(String password) {
            if (Objects.nonNull(password) && !password.trim().isEmpty()) {
                this.password = password;
            }
            return this;
        }

        public UserBuilder role(Role role) {
            if (Objects.nonNull(role)) {
                this.role = role;
            }
            return this;
        }

        public UserBuilder enable(boolean enable) {
            this.enable = enable;
            return this;
        }

        public User build() {
            User user = new User();
            user.id = this.id;
            user.name = this.name;
            user.lastName = this.lastName;
            user.email = this.email;
            user.enable = this.enable;
            user.phoneNumber = this.phoneNumber;
            user.role = this.role;
            user.password = this.password;
            return user;
        }
    }
}
