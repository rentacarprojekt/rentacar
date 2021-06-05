package hr.tvz.project.repository;

import hr.tvz.project.enums.VehicleManufacturerEnum;
import hr.tvz.project.enums.VehicleTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer>{

    Vehicle findByManufacturerLike(VehicleManufacturerEnum vehicleManufacturer);
    Vehicle findByModelLike(String model);
    Vehicle findByTypeLike(VehicleTypeEnum vehicleType);
}
