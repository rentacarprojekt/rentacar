package hr.tvz.project.dto;

import java.io.Serial;
import java.io.Serializable;

import hr.tvz.project.enums.RoleEnum;
import hr.tvz.project.model.User;

public class UserDetailsDto implements Serializable {

    @Serial
    private static final long serialVersionUID = -7906285280211033956L;

    private String firstName;
    private String lastName;
    private String username;
    private String address;
    private String email;
    private String bio;
    private String phoneNumber;
    private String imagePath;
    private RoleEnum role;

    public UserDetailsDto() {

    }

    public UserDetailsDto(User user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.username = user.getUsername();
        this.address = user.getAddress();
        this.email = user.getEmail();
        this.bio = user.getBio();
        this.phoneNumber = user.getPhoneNumber();
        this.imagePath = user.getImagePath();
        this.role = user.getRole();
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

}
