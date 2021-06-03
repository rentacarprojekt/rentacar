package hr.tvz.project.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.enums.RoleEnum;

@Entity
@Table(name = "USERS")
public class User implements Serializable{

	private static final long serialVersionUID = -3975572562071301541L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "FIRST_NAME")
	private String firstName;
	@Column(name = "LAST_NAME")
	private String lastName;
	@Column(unique = true)
	private String username;
	private String password;
	@Column(unique = true)
	private String address;
	private String email;
	private String bio;
	@Column(name = "PHONE_NUMBER")
	private String phoneNumber;
	@Column(name = "IMAGE_PATH")
	private String imagePath;
	@Enumerated(EnumType.ORDINAL)
	private RoleEnum role;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<Rental> rentalList;
	
	public User() {
		super();
	}
	
	public User(UserRegistrationDto userDto) {
		this.firstName = userDto.getFirstName();
		this.lastName = userDto.getLastName();
		this.username = userDto.getUsername();
		this.email = userDto.getEmail();
		this.password = userDto.getPassword();
		this.role = RoleEnum.USER;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public RoleEnum getRole() {
		return role;
	}

	public void setRole(RoleEnum role) {
		this.role = role;
	}

	public List<Rental> getRentalList() {
		return rentalList;
	}

	public void setRentalList(List<Rental> rentalList) {
		this.rentalList = rentalList;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
