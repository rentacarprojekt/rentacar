package hr.tvz.project.jdbcrepository;

import hr.tvz.project.model.Vehicle;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.*;

@Profile("dev")
@Repository
public class MockVehicleRepository implements VehicleRepository{
    private final Set<Vehicle> MOCKED_VEHICLES = new HashSet<>(
            Arrays.asList(
                    new Vehicle(1, "M3", "BMW", "limounsine", "2500000", 2005, 5000000, "resources/bzvz.png", true),
                    new Vehicle(2, "M5", "BMW", "limounsine", "425555", 2008, 350000, "resources/bzvz1.png", false)
            )
    );

    @Override
    public Set<Vehicle> findAll() {
        return MOCKED_VEHICLES;
    }

    @Override
    public Optional<Vehicle> findByModel(String model) {
        return MOCKED_VEHICLES.stream().filter(vehicle -> vehicle.getModel().equals(model)).findAny();
    }

    @Override
    public Optional<Vehicle> save(Vehicle vehicle) {
        if (!MOCKED_VEHICLES.contains(vehicle)) {
            MOCKED_VEHICLES.add(vehicle);
            return Optional.of(vehicle);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Vehicle> delete(String model, Vehicle vehicle) {
        boolean exists = MOCKED_VEHICLES.removeIf(
                it -> Objects.equals(it.getModel(), model) && Objects.equals(it.getModel(), vehicle.getModel())
        );

        if (exists) {
            MOCKED_VEHICLES.add(vehicle);
            return Optional.of(vehicle);
        } else {
            return Optional.empty();
        }
    }
}
