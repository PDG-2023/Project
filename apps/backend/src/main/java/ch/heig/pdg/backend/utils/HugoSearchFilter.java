package ch.heig.pdg.backend.utils;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.Optional;

public class HugoSearchFilter<T> {
    public final CriteriaQuery<T> criteriaQuery;
    public final Integer offset;
    public final Integer limit;

    private HugoSearchFilter(CriteriaQuery<T> criteriaQuery, Integer offset, Integer limit) {
        this.criteriaQuery = criteriaQuery;
        this.offset = offset;
        this.limit = limit;
    }

    public static <T> HugoSearchFilter<T> build(HttpServletRequest request){
        return new HugoSearchFilter<>(null, 0, 0);
    }
}
