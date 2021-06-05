package hr.tvz.project.dto;

import hr.tvz.project.model.Rental;
import hr.tvz.project.model.User;
import hr.tvz.project.model.Vehicle;

import java.io.Serializable;
import java.time.LocalDate;


public class RentalDetailsDto implements Serializable {

    private Integer id;
    private User user;
    private Vehicle vehicle;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private LocalDate returnDate;

    public RentalDetailsDto() {
    }

    public RentalDetailsDto(Rental rental) {
        this.user = rental.getUser();
        this.vehicle = rental.getVehicle();
        this.dateFrom = rental.getDateFrom();
        this.dateTo = rental.getDateTo();
        this.returnDate = rental.getReturnDate();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }
}
