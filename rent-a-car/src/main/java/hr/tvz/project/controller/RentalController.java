package hr.tvz.project.controller;

import hr.tvz.project.dto.RentalDetailsDto;
import hr.tvz.project.exceptions.RentalNotFoundException;
import hr.tvz.project.service.RentalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rac/rentals")
@CrossOrigin(origins = " http://localhost:3000")
public class RentalController {

    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping
    public ResponseEntity<String> saveRental(@RequestBody final RentalDetailsDto newRental) {
        rentalService.createNewRental(newRental);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/id/{id}")
    public RentalDetailsDto getRentalById(@PathVariable Integer id) {
        return rentalService.getRentalById(id);
    }
    
    @GetMapping("/user/{username}")
    public RentalDetailsDto getRentalByUsername(@PathVariable String username) {
        return rentalService.getRentalByUsername(username);
    }


    @GetMapping
    public List<RentalDetailsDto> getAllRentals() {
        return rentalService.getAllRentals();
    }
    
    @PutMapping
    public ResponseEntity<String> updateRental(@RequestBody RentalDetailsDto updatedRental){
    	rentalService.updateRental(updatedRental);
    	return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRental(@PathVariable Integer id) {

        try {
            rentalService.deleteRental(id);
        } catch (RentalNotFoundException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

        return new ResponseEntity<String>(HttpStatus.ACCEPTED);
    }

}
