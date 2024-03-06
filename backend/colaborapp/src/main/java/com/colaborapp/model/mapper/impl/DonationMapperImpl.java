package com.colaborapp.model.mapper.impl;

import com.colaborapp.dto.DonationResponseDTO;
import com.colaborapp.model.Donation;
import com.colaborapp.model.mapper.DonationMapper;
import com.colaborapp.model.mapper.ProjectMapper;
import com.colaborapp.model.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DonationMapperImpl implements DonationMapper {
    private final ProjectMapper projectMapper;
    private final UserMapper userMapper;

    @Override
    public DonationResponseDTO toDTO(Donation entity) {
        return DonationResponseDTO.builder()
                .id(entity.getId())
                .project(projectMapper.toDTO(entity.getProject()))
                .donor(userMapper.toDTO(entity.getDonor()))
                .amountDonated(entity.getAmount())
                .dateTime(entity.getDateTime())
                .build();
    }
}
