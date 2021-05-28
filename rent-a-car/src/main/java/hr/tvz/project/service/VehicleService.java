package hr.tvz.project.service;

import hr.tvz.project.dto.VehicleDetailsDto;
import hr.tvz.project.enums.VehicleManufacturerEnum;
import hr.tvz.project.enums.VehicleTypeEnum;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehicleService{

//    VehicleDetailsDto createNewVehicle(VehicleRegistrationDto newVehicle);

    VehicleDetailsDto getById(Integer id);

    VehicleDetailsDto getByModel(String model);

    VehicleDetailsDto getByManufacturer(VehicleManufacturerEnum manufacturer);

    VehicleDetailsDto getByType(VehicleTypeEnum vehicleType);

    List<VehicleDetailsDto> getAllCars();

    VehicleDetailsDto updateCar(VehicleDetailsDto updatedVehicle);

}
