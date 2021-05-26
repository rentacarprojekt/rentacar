package hr.tvz.project.exceptions;

public class UsernameOrEmailAlreadyInUseException extends Exception{

	private static final long serialVersionUID = -5047762307582383935L;

	public UsernameOrEmailAlreadyInUseException(String message) {
		super(message);
	}	

}
