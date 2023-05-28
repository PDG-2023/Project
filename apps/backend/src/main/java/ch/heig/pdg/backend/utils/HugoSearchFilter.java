package ch.heig.pdg.backend.utils;

import org.springframework.web.context.request.NativeWebRequest;

import java.util.Optional;

public class HugoSearchFilter {

    public static HugoSearchFilter build(Optional<NativeWebRequest> request){
        if(request.isEmpty()){
            throw new RuntimeException();
        }

        NativeWebRequest req = request.get();

//        req.get
        return new HugoSearchFilter();
    }
}
