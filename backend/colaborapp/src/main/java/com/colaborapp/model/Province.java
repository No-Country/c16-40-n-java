package com.colaborapp.model;

import java.util.Set;

public enum Province {
    JUJUY,
    SALTA,
    MISIONES,
    FORMOSA,
    CHACO,
    TUCUMAN,
    LARIOJA,
    CORRIENTES,
    CATAMARCA,
    ENTRE_RIOS,
    CORDOBA,
    SAN_JUAN,
    SAN_LUIS,
    SANTIAGO_DEL_ESTERO,
    SANTA_FE,
    SANTA_CRUZ,
    MENDOZA,
    LA_PAMPA,
    BUENOS_AIRES,
    RIO_NEGRO,
    NEUQUEN,
    CHUBUT,
    TIERRA_DEL_FUEGO;

    private static final Set<String> provinces = Set.of(
            "JUJUY",
            "SALTA",
            "MISIONES",
            "FORMOSA",
            "CHACO",
            "TUCUMAN",
            "LARIOJA",
            "CORRIENTES",
            "CATAMARCA",
            "ENTRE_RIOS",
            "CORDOBA",
            "SAN_JUAN",
            "SAN_LUIS",
            "SANTIAGO_DEL_ESTERO",
            "SANTA_FE",
            "SANTA_CRUZ",
            "MENDOZA",
            "LA_PAMPA",
            "BUENOS_AIRES",
            "RIO_NEGRO",
            "NEUQUEN",
            "CHUBUT",
            "TIERRA_DEL_FUEGO"
    );

    public static Province getProvinceFromString(String value) {
        String province = value.toUpperCase();
        if (!provinces.contains(province)) {
            throw new IllegalArgumentException("Unknown Province: %s".formatted(value)); // TODO: catch me
        }
        return Province.valueOf(province);
    }
}
