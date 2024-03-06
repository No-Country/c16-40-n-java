package com.colaborapp.service.impl;

import com.colaborapp.dto.DonationRequestDTO;
import com.colaborapp.dto.DonationResponseDTO;
import com.colaborapp.model.Donation;
import com.colaborapp.model.Project;
import com.colaborapp.model.User;
import com.colaborapp.model.mapper.DonationMapper;
import com.colaborapp.repository.DonationRepository;
import com.colaborapp.service.DonationService;
import com.colaborapp.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {
    private final DonationRepository donationRepository;
    private final DonationMapper donationMapper;
    private final ProjectService projectService;

    @Override
    public DonationResponseDTO createDonation(User donor, Long projectId, DonationRequestDTO request) {
        Assert.notNull(donor, "Donor user can't be null.");
        Assert.notNull(request, "Request to create a donation can't be null.");
        Project project = projectService.getProjectEntityById(projectId);
        if (project.isNoLongerActive() || project.isEnded()) {
            throw new RuntimeException("Error: The project '%s' is no longer available.".formatted(project.getTitle())); // TODO: catch me
        }
        if (project.getCreator().equals(donor)) {
            throw new RuntimeException("Can't donate to an owned project."); // TODO: catch me
        }
        if (project.getCurrentAmount() >= project.getGoalAmount()) {
            throw new RuntimeException("This project reached the goal amount."); // TODO: catch me
        }
        projectService.updateCurrentAmount(project, request.amount());
        Donation donation = Donation.builder()
                                    .donor(donor)
                                    .project(project)
                                    .amount(request.amount())
                                    .dateTime(LocalDateTime.now())
                                    .build();
        return donationMapper.toDTO(donationRepository.save(donation));
    }
}
