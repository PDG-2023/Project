package ch.heig.pdg.backend.exception.handling;

import java.util.ArrayList;
import java.util.List;

public class JSONErrorMessage {

    private List<String> errors = null;

    public JSONErrorMessage errors(List<String> errors) {
        this.errors = errors;
        return this;
    }

    public JSONErrorMessage addErrorsItem(String errorsItem) {
        if (this.errors == null) {
            this.errors = new ArrayList<>();
        }
        this.errors.add(errorsItem);
        return this;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
}

