package hr.tvz.project.service;

import hr.tvz.project.dto.VehicleDetailsDto;
import hr.tvz.project.enums.VehicleManufacturerEnum;
import hr.tvz.project.enums.VehicleTypeEnum;
import hr.tvz.project.model.Vehicle;
import hr.tvz.project.repository.VehicleRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public VehicleDetailsDto getById(Integer id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        if (vehicle != null)
            return new VehicleDetailsDto(vehicle);
        else
            return null;

    }

    @Override
    public VehicleDetailsDto getByModel(String model) {
        Vehicle vehicle = vehicleRepository.findByModelLike(model);
        if (vehicle != null)
            return new VehicleDetailsDto(vehicle);
        else
            return null;
    }

    @Override
    public VehicleDetailsDto getByManufacturer(VehicleManufacturerEnum manufacturer) {

        Vehicle vehicle = vehicleRepository.findByVehicleManufacturerLike(manufacturer);

        if (vehicle != null)
            return new VehicleDetailsDto(vehicle);
        else
            return null;

    }

    @Override
    public VehicleDetailsDto getByType(VehicleTypeEnum vehicleType) {
        Vehicle vehicle = vehicleRepository.findByVehicleTypeLike(vehicleType);

        if (vehicle != null)
            return new VehicleDetailsDto(vehicle);
        else
            return null;
    }

    @Override
    public List<VehicleDetailsDto> getAllCars() {
        return vehicleRepository.findAll().stream().map(VehicleDetailsDto::new).collect(Collectors.toList());
    }

    @Override
    public VehicleDetailsDto updateCar(VehicleDetailsDto updatedVehicle) {
        Vehicle vehicle = vehicleRepository.findByModelLike(updatedVehicle.getModel());
        vehicle.setModel(updatedVehicle.getModel());
        vehicle.setManufacturer(updatedVehicle.getManufacturer());
        vehicle.setMileage(updatedVehicle.getMileage());
        vehicle.setAvailable(updatedVehicle.isAvailable());
        vehicle.setPrice(updatedVehicle.getPrice());
        vehicle.setProductionYear(updatedVehicle.getProductionYear());
        vehicle.setType(vehicle.getType());

        vehicleRepository.save(vehicle);

        return updatedVehicle;
    }
}
