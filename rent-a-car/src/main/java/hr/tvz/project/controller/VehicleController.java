package hr.tvz.project.controller;


import hr.tvz.project.dto.VehicleDetailsDto;
import hr.tvz.project.enums.VehicleManufacturerEnum;
import hr.tvz.project.enums.VehicleTypeEnum;
import hr.tvz.project.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rac/vehicles")
@CrossOrigin(origins = " http://localhost:3000")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping("/id/{id}")
    public VehicleDetailsDto geVehicleById(@PathVariable Integer id) {
        return vehicleService.getById(id);
    }

    @GetMapping("/model/{model}")
    public VehicleDetailsDto getVehicleByModel(@PathVariable String model) {
        return vehicleService.getByModel(model);
    }

    @GetMapping("/manufacturer/{manufacturer}")
    public VehicleDetailsDto getVehicleByManufacturer(@PathVariable VehicleManufacturerEnum manufacturer) {
        return vehicleService.getByManufacturer(manufacturer);
    }

    @GetMapping("/type/{type}")
    public VehicleDetailsDto getVehicleByType(@PathVariable VehicleTypeEnum type){
        return vehicleService.getByType(type);
    }

    @GetMapping("/all")
    public List<VehicleDetailsDto> getAllCars() {
        return vehicleService.getAllCars();
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody VehicleDetailsDto updatedVehicle){
        vehicleService.updateCar(updatedVehicle);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}
