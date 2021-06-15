package hr.tvz.project.dto;

public class JsonWebToken {
	private String token;
	
	public JsonWebToken(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}	

}
