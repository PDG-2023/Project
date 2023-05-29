package ch.heig.pdg.backend;

import ch.heig.pdg.backend.security.filters.AuthorizationFilter;
import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.openapitools.jackson.nullable.JsonNullableModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {
    private final AuthorizationFilter authFilter;

    public BackendApplication(AuthorizationFilter authFilter) {
        this.authFilter = authFilter;
    }

    @Bean
    public FilterRegistrationBean<AuthorizationFilter> filterRegistrationBean() {
        FilterRegistrationBean<AuthorizationFilter> registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(authFilter);
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

    @Bean
    public JsonNullableModule jsonNullableModule() {
        return new JsonNullableModule();
    }

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomcatCustomizer() {
        return (tomcat) ->
                tomcat.addConnectorCustomizers((connector) ->
                        ((AbstractHttp11Protocol<?>) connector.getProtocolHandler()).setRelaxedQueryChars("[]")
                );
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
