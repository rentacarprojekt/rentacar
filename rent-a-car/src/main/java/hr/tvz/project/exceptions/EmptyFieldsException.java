package hr.tvz.project.exceptions;

public class EmptyFieldsException extends RuntimeException {

	private static final long serialVersionUID = -7222898888789242099L;

	public EmptyFieldsException(String message) {
		super(message);
	}

}
