package ch.heig.pdg.backend.unit.utils;

import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

public class DateFormatUtilsTest {

    @Test
    public void testDateToString() {
        LocalDateTime date = LocalDateTime.of(2023, 6, 4, 15, 30);
        String dateString = DateFormatUtil.dateToString(date);
        Assertions.assertEquals("2023-06-04T15:30", dateString);
    }

    @Test
    public void testStringToDate() {
        String dateString = "2023-06-04T15:30";
        LocalDateTime date = DateFormatUtil.stringToDate(dateString);
        Assertions.assertEquals(LocalDateTime.of(2023, 6, 4, 15, 30), date);
    }
}
