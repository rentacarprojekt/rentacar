package hr.tvz.project.service;

import hr.tvz.project.dto.RentalDetailsDto;
import hr.tvz.project.exceptions.RentalNotFoundException;
import hr.tvz.project.model.Rental;
import hr.tvz.project.repository.RentalRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RentalServiceImpl implements RentalService {


    private final RentalRepository rentalRepository;

    public RentalServiceImpl(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }


    @Override
    public RentalDetailsDto createNewRental(RentalDetailsDto newRental) {
        return new RentalDetailsDto(rentalRepository.save(new Rental(newRental)));
    }

    @Override
    public void deleteRental(RentalDetailsDto deletedRental) throws RentalNotFoundException {
        Rental rental = rentalRepository.findByVehicleLike(deletedRental.getVehicle());
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
}
