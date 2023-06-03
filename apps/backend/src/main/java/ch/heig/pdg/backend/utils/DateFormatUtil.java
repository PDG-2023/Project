package ch.heig.pdg.backend.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@SuppressWarnings("checkstyle:HideUtilityClassConstructor")
public final class DateFormatUtil {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

    public static String dateToString(LocalDateTime date) {
        return date.format(DATE_FORMAT);
    }

    public static LocalDateTime stringToDate(String date) {
        return LocalDateTime.parse(date, DATE_FORMAT);
    }
}
