package ch.heig.pdg.backend.security.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
public class CurrentUser {
    public static class CurrentUserData {
        public final Integer userId;

        public CurrentUserData(Integer userId) {
            this.userId = userId;
        }
    }

    private CurrentUserData currentUserData;

    public void setCurrentUserData(CurrentUserData currentUserData) {
        if (this.currentUserData != null)
            throw new IllegalStateException("Cannot set user data again");
        this.currentUserData = currentUserData;
    }

    public CurrentUserData getCurrentUserData() {
        return currentUserData;
    }
}
