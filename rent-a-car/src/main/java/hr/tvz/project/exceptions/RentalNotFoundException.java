package hr.tvz.project.exceptions;

public class RentalNotFoundException extends Exception {

    private static final long serialVersionUID = -1224587855464577845L;

    public RentalNotFoundException(String message) {
        super(message);
    }
}
