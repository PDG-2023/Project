package ch.heig.pdg.backend.presentation;

import jakarta.servlet.http.HttpServletRequest;

public abstract class AbstractController {
    protected final HttpServletRequest httpServletRequest;

    public AbstractController(HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
    }
}
