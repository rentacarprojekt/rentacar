package hr.tvz.project.service;

import hr.tvz.project.dto.VehicleDetailsDto;
import hr.tvz.project.exceptions.VehicleNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehicleService{

    VehicleDetailsDto createNewVehicle(VehicleDetailsDto newVehicle);

    VehicleDetailsDto getById(Integer id);

    void delete(VehicleDetailsDto vehicle) throws VehicleNotFoundException;

    List<VehicleDetailsDto> getAllCars();

    List<VehicleDetailsDto> getAvailableCars();

}
