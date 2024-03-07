package com.colaborapp.utils;

public class ApiUtil {
    // token duration: 12 hours
    public static final Integer VALID_TOKEN_TIME = 1000 * 60 * 60 * 12;

    // token duration: 1 minute
    public static final Integer ONE_MINUTE_VALID = 1000 * 60;

    // frontend URL
    public static final String ALLOWED_ORIGIN = "https://colaborapp.vercel.app/";

    public static final String ENCODING = "UTF-8";

    public static String createContentPreDeletion(String projectName) {
        return ("Estimado usuario, se le informa que el proyecto '%s' será dado de baja en los próximos " +
                "30 (treinta) días.\n" +
                "Al momento de recibir el presente correo, el proyecto pasará a estar en estado 'PENDIENTE' " +
                "hasta su completa baja.\n" +
                "Ante cualquier consulta puede responder a éste correo.\n" +
                "\n" +
                "Atte. el equipo de Colaborapp!").formatted(projectName);
    }

    public static String createContentPosDeletion(String projectName) {
        return ("El proyecto '%s' fue completamente retirado de nuesta plataforma.\n" +
                "\n" +
                "Gracias por usar Colaborapp!").formatted(projectName);
    }

    public static String createContentForCreator(String projectTitle,
                                                 String volunteerFullName,
                                                 String volunteerEmail,
                                                 String volunteerPhoneNumber) {
        return ("Un usuario se ha postulado como voluntario para tu proyecto %s. " +
                "A continuación verás los datos del voluntario. " +
                "Ponte en contacto con el usuario a travez de los canales que proporcionó. " +
                "Nombre completo: %s " +
                "Correo: %s " +
                "Teléfono: %s").formatted(projectTitle, volunteerFullName, volunteerEmail, volunteerPhoneNumber);
    }

    public static String createContentForVolunteer(String projectTitle) {
        return ("Te hás postulado exitosamente como voluntario para el proyecto '%s'. " +
                "El dueño del proyecto se pondrá en contacto contigo por los canales de comunicación que " +
                "proporcionaste (teléfono y correo electrónico).\n" +
                "Gracias por usar Colaborapp!").formatted(projectTitle);
    }
}
