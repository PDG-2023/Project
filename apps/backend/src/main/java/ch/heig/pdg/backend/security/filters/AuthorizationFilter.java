package ch.heig.pdg.backend.security.filters;

import ch.heig.pdg.backend.security.annotations.AuthenticationRequired;
import ch.heig.pdg.backend.security.services.JWTValidatorService;
import ch.heig.pdg.backend.security.utils.CurrentUser;
import ch.heig.pdg.backend.security.utils.InvalidJWTException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class AuthorizationFilter extends OncePerRequestFilter {

    private final JWTValidatorService jwtValidatorService;

    private final CurrentUser currentUser;

    private final ApplicationContext applicationContext;

    public AuthorizationFilter(JWTValidatorService jwtValidatorService, CurrentUser currentUser, ApplicationContext applicationContext) {
        this.jwtValidatorService = jwtValidatorService;
        this.currentUser = currentUser;
        this.applicationContext = applicationContext;
    }

    private final ArrayList<String> OPEN_PAGES = new ArrayList<>() {
        {
            add("/swagger-ui/");
        }
    };

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null) {
            String[] authorizationHeaderSplit = authorizationHeader.split(" ");
            if (authorizationHeaderSplit.length == 2) {
                String jwt = authorizationHeaderSplit[1];
                try {
                    DecodedJWT decodedJWT = this.jwtValidatorService.validateJWT(jwt);
                    currentUser.setCurrentUserData(new CurrentUser.CurrentUserData(Integer.parseInt(decodedJWT.getSubject())));
                } catch (InvalidJWTException ignored) {
                }
            }
        }


        HandlerExecutionChain handlerExecutionChain = null;
        try {
            handlerExecutionChain = ((RequestMappingHandlerMapping) this.applicationContext.getBean("requestMappingHandlerMapping")).getHandler(request);
        } catch (Exception ignored) {
        }

        if (handlerExecutionChain == null) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        HandlerMethod handlerMethod = (HandlerMethod) handlerExecutionChain.getHandler();

        if (
                handlerMethod.getMethod().getAnnotation(AuthenticationRequired.class) != null
                        || handlerMethod.getClass().getAnnotation(AuthenticationRequired.class) != null
        ) {
            if (this.currentUser.getCurrentUserData() == null){
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return this.OPEN_PAGES.stream().anyMatch(request.getServletPath()::startsWith);
    }
}
