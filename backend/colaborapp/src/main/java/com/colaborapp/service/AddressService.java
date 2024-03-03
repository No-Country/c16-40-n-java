package com.colaborapp.service;

import com.colaborapp.dto.AddressRequestDTO;
import com.colaborapp.model.Address;

public interface AddressService {
    Address createNewAddress(AddressRequestDTO request);

    void updateAddress(Address address, AddressRequestDTO updateRequest);
}
