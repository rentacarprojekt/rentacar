package hr.tvz.project.service;

import hr.tvz.project.dto.RentalDetailsDto;
import hr.tvz.project.exceptions.RentalNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RentalService {

    RentalDetailsDto createNewRental(RentalDetailsDto newRental);

    void deleteRental(RentalDetailsDto deletedRental) throws RentalNotFoundException;

    List<RentalDetailsDto> getAllRentals();

    RentalDetailsDto getRentalById(Integer id);



}