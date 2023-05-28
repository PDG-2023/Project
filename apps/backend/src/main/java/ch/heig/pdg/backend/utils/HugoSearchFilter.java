package ch.heig.pdg.backend.utils;

import jakarta.persistence.criteria.CriteriaQuery;
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

    public static HugoSearchFilter build(Optional<NativeWebRequest> request){
        if(request.isEmpty()){
            throw new RuntimeException();
        }

        NativeWebRequest req = request.get();

        return new HugoSearchFilter(null, 0, 0);
    }
}
