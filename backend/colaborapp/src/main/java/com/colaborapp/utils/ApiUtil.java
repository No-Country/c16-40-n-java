package com.colaborapp.utils;

import java.util.Date;

public class ApiUtil {
    // token duration: 12 hours
    public static final Date VALID_TOKEN_TIME = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 12);

    // frontend URL
    public static final String ALLOWED_ORIGIN = "https://colaborapp.vercel.app/";
}
