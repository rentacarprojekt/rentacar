package hr.tvz.project.repository;

import hr.tvz.project.model.User;
import hr.tvz.project.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.Rental;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Integer>{

    Rental findByUserLike(User user);
    Rental findByVehicleLike(Vehicle vehicle);
    Rental findByReturnDateLike(LocalDate returnDate);
    List<Rental> findByUser_UsernameLike(String username);

}
