package com.colaborapp.utils;

public class ApiUtil {
    // token duration: 12 hours
    public static final Integer VALID_TOKEN_TIME = 1000 * 60 * 60 * 12;

    // token duration: 1 minute
    public static final Integer ONE_MINUTE_VALID = 1000 * 60;

    // frontend URL
    public static final String ALLOWED_ORIGIN = "https://colaborapp.vercel.app/";
}
