package ch.heig.pdg.backend.utils;

import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;

public record HugoSearchFilter<T>(HashMap<String, String> filters, Class<T> klass) {

    public boolean hasFilters() {
        return filters.size() > 0;
    }

    public static <T> HugoSearchFilter<T> build(HttpServletRequest request, Class<T> klass) {
        HashMap<String, String> filters = new HashMap<>();
        for (Map.Entry<String, String[]> entry : request.getParameterMap().entrySet()) {
            if (entry.getKey().matches("^(where|limit|offset|order).*")) {
                filters.put(entry.getKey(), entry.getValue()[0]);
            }
        }
        return new HugoSearchFilter<>(filters, klass);
    }
}
