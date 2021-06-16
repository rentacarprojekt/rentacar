package hr.tvz.project.service;

import hr.tvz.project.dto.RentalDetailsDto;
import hr.tvz.project.dto.VehicleDetailsDto;
import hr.tvz.project.exceptions.RentalNotFoundException;
import hr.tvz.project.model.Rental;
import hr.tvz.project.repository.RentalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RentalServiceImpl implements RentalService {


    private final RentalRepository rentalRepository;
    @Autowired
    private VehicleService vehicleService;

    public RentalServiceImpl(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }


    @Override
    public RentalDetailsDto createNewRental(RentalDetailsDto newRental) {
    	VehicleDetailsDto vehicle = vehicleService.getById(newRental.getVehicle().getId());
    	if(vehicle.isAvailable()) {
    		Rental rental = rentalRepository.save(new Rental(newRental));
    		vehicleService.setAvailable(newRental.getVehicle().getId(), false);
    		return new RentalDetailsDto(rental);
    	}
    	else
    		return null;
    }

    @Override
    public void deleteRental(Integer id) throws RentalNotFoundException {
        Rental rental = rentalRepository.findById(id).orElse(null);
        if(rental!=null){
            rentalRepository.delete(rental);
        } else {
            throw new RentalNotFoundException("Zatraženi rent ne postoji");
        }
    }

    @Override
    public List<RentalDetailsDto> getAllRentals() {
        return rentalRepository.findAll().stream().map(RentalDetailsDto::new).collect(Collectors.toList());

    }

    @Override
    public RentalDetailsDto getRentalById(Integer id) {
        Rental rental = rentalRepository.findById(id).orElse(null);
        if(rental!=null)
            return new RentalDetailsDto(rental);
        else
            return null;
    }


	@Override
	public List<RentalDetailsDto> getRentalByUsername(String username) {

        List<Rental> rental = rentalRepository.findByUser_UsernameLike(username);
        List<RentalDetailsDto> rentalList = new ArrayList<>();
        if(rental!=null) {
        	for(Rental r : rental) {
        		rentalList.add(new RentalDetailsDto(r));
        	}
            return rentalList;
        }
        else
            return null;
	}

	@Override
	public void updateRental(RentalDetailsDto updatedRental) {
		Rental rental = rentalRepository.findById(updatedRental.getId()).orElse(null);
		rental.setReturnDate(LocalDate.now());
		vehicleService.setAvailable(updatedRental.getVehicle().getId(), true);
		rentalRepository.save(rental);		
	}
}
