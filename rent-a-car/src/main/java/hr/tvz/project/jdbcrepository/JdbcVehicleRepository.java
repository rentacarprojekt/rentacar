package hr.tvz.project.jdbcrepository;

import hr.tvz.project.model.Vehicle;

import java.util.Optional;
import java.util.Set;

public interface JdbcVehicleRepository {
    Set<Vehicle> findAll();
    Optional<Vehicle> findByModel(String model);
    Optional<Vehicle> save(Vehicle vehicle);
    Optional<Vehicle> delete(String model, Vehicle vehicle);
}
