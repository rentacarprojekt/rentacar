package hr.tvz.project.repository;

import hr.tvz.project.model.User;
import hr.tvz.project.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.Rental;

import java.time.LocalDate;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Integer>{

    Rental findByUserLike(User user);
    Rental findByVehicleLike(Vehicle vehicle);
    Rental findByReturnDateLike(LocalDate returnDate);
    Rental findByUser_UsernameLike(String username);

}
