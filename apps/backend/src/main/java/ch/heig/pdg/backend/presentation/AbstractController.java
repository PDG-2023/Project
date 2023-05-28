package ch.heig.pdg.backend.presentation;

import jakarta.servlet.http.HttpServletRequest;

abstract public class AbstractController {
    protected final HttpServletRequest httpServletRequest;

    public AbstractController(HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
    }
}
