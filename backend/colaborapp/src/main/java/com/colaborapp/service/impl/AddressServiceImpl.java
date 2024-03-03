package com.colaborapp.service.impl;

import com.colaborapp.dto.AddressRequestDTO;
import com.colaborapp.model.Address;
import com.colaborapp.model.Province;
import com.colaborapp.repository.AddressRepository;
import com.colaborapp.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;

    @Override
    public Address createNewAddress(AddressRequestDTO request) {
        Assert.notNull(request, "The request to create an Address can't be null.");
        Province province = Province.getProvinceFromString(request.province());
        Address address = Address.builder()
                .city(request.city())
                .province(province)
                .street(request.street())
                .number(request.number())
                .build();
        return addressRepository.save(address);
    }

    @Override
    public void updateAddress(Address address, AddressRequestDTO updateRequest) {
        Assert.notNull(updateRequest, "The request to update the Address info can't be null.");
        if (Objects.nonNull(updateRequest.province()) && !updateRequest.province().trim().isEmpty()) {
            Province province = Province.getProvinceFromString(updateRequest.province());
            address.setProvince(province);
        }
        address.setCity(updateRequest.city());
        address.setStreet(updateRequest.street());
        address.setNumber(updateRequest.number());
        addressRepository.save(address);
    }
}
