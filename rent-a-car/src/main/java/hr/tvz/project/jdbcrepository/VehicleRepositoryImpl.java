package hr.tvz.project.jdbcrepository;

import hr.tvz.project.model.Rental;
import hr.tvz.project.model.Vehicle;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Repository
public class VehicleRepositoryImpl implements VehicleRepository {

    private static final String SELECT_ALL = "SELECT id, jmbag, first_name, last_name, ects_points, date_of_birth FROM student";

    private final JdbcTemplate jdbc;
    private final SimpleJdbcInsert inserter;

    public VehicleRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
        this.inserter = new SimpleJdbcInsert(jdbc).withTableName("vehicles").usingGeneratedKeyColumns("id");
    }

    @Override
    public Set<Vehicle> findAll() {
        return Set.copyOf(jdbc.query(SELECT_ALL, this::mapRowToVehicle));
    }

    @Override
    public Optional<Vehicle> findByModel(String model) {
        try {
            return Optional
                    .ofNullable(jdbc.queryForObject(SELECT_ALL + " WHERE model = ?", this::mapRowToVehicle, model));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    private Vehicle mapRowToVehicle(ResultSet resultSet, int i) throws SQLException {
        return new Vehicle(resultSet.getInt("id"), resultSet.getString("model"), resultSet.getString("manufacturer"),
                resultSet.getString("type"), resultSet.getString("mileage"), resultSet.getInt("productionYear"),
                resultSet.getInt("price"), resultSet.getString("imagePath"),resultSet.getBoolean("available"));

    }

    @Override
    public Optional<Vehicle> save(Vehicle vehicle) {
        try {
            vehicle.setId(saveVehicleDetails(vehicle));
            return Optional.of(vehicle);
        } catch (DuplicateKeyException e) {
            return Optional.empty();
        }
    }

    private Integer saveVehicleDetails(Vehicle vehicle) {
        Map<String, Object> values = new HashMap<>();

        values.put("model", vehicle.getModel());
        values.put("manufacturer", vehicle.getManufacturer());
        values.put("type", vehicle.getType());
        values.put("mileage", vehicle.getMileage());
        values.put("productionYear", vehicle.getProductionYear());
        values.put("price", vehicle.getPrice());
        values.put("imagePath", vehicle.getImagePath());
        values.put("available", vehicle.isAvailable());
        values.put("rentalList", vehicle.getRentalList());

        return inserter.executeAndReturnKey(values).intValue();
    }

    @Override
    public Optional<Vehicle> delete(String model, Vehicle vehicle) {
        int executed = jdbc.update(
                "DELETE vehicles set " + "type = ?, " + "mileage = ?, " + "productionYear = ? "
                        + "price = ? " + "imagePath = ? " + "available = ? " + "WHERE model = ?",
                vehicle.getType(), vehicle.getMileage(), vehicle.getProductionYear(), vehicle.getPrice(),
                vehicle.getImagePath(), vehicle.isAvailable());

        if (executed > 0) {
            return Optional.of(vehicle);
        } else {
            return Optional.empty();
        }
    }
}

