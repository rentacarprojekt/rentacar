package hr.tvz.project.controller;


import hr.tvz.project.dto.VehicleDetailsDto;
import hr.tvz.project.exceptions.VehicleNotFoundException;
import hr.tvz.project.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("rac/vehicles")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }


    @PostMapping
    public ResponseEntity<String> saveVehicle(@RequestBody final VehicleDetailsDto newVehicle) {
        vehicleService.createNewVehicle(newVehicle);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public VehicleDetailsDto geVehicleById(@PathVariable Integer id) {
        return vehicleService.getById(id);
    }


    @GetMapping
    public List<VehicleDetailsDto> getAllCars() {
        return vehicleService.getAllCars();
    }
    
    @GetMapping("/available")
    public List<VehicleDetailsDto> getAvailableCars() {
        return vehicleService.getAvailableCars();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable int id) {
        try{
            vehicleService.delete(id);
        }catch (VehicleNotFoundException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

        return new ResponseEntity<String>(HttpStatus.ACCEPTED);
    }
    
    @PostMapping(path="/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> changeImage(@PathVariable Integer id, @RequestParam MultipartFile file){
    	vehicleService.changeImage(id, file);
    	return new ResponseEntity<String>(HttpStatus.ACCEPTED);
    }


}
