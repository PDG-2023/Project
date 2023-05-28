package ch.heig.pdg.backend.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateFormatUtil {
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    public static String dateToString(LocalDateTime date) {
        return date.format(DATE_FORMAT);
    }

    public static LocalDateTime stringToDate(String date) {
        return LocalDateTime.parse(date, DATE_FORMAT);
    }
}
