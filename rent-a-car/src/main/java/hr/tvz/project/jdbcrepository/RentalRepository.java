package hr.tvz.project.jdbcrepository;

import hr.tvz.project.model.Rental;
import hr.tvz.project.model.User;

import java.util.Optional;
import java.util.Set;

public interface RentalRepository {
    Set<Rental> findAll();
    Optional<Rental> findByUser(User user);
    Optional<Rental> save(Rental rental);
    Optional<Rental> delete(Rental rental);
}
