package ch.heig.pdg.backend.security.services;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

@Service
public class InputSanitizerService {

    /**
     * Removes all the HTML tags from a string
     *
     * @param unsafe The string to sanitize
     * @return The sanitized string
     */
    public String removeHTMLTags(String unsafe) {
        return Jsoup.parse(unsafe).text();

    }

    /**
     * Removes all non-formatting HTML tags from a string.
     *
     * @param unsafe The string to sanitize
     * @return The sanitized string
     */
    public String cleanUnsafeHTMLTags(String unsafe) {
        return Jsoup.clean(
                unsafe,
                Safelist.basicWithImages()
                        .addAttributes("span", "style")
                        .addAttributes("p", "style")
                        .removeEnforcedAttribute("a", "rel")
        );
    }
}
