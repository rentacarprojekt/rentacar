package hr.tvz.project.service;

import hr.tvz.project.dto.VehicleDetailsDto;
import hr.tvz.project.exceptions.VehicleNotFoundException;
import hr.tvz.project.model.User;
import hr.tvz.project.model.Vehicle;
import hr.tvz.project.repository.VehicleRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public VehicleDetailsDto createNewVehicle(VehicleDetailsDto newVehicle) {
    	newVehicle.setAvailable(true);
        return new VehicleDetailsDto(vehicleRepository.save(new Vehicle(newVehicle)));
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
    public void delete(Integer id) throws VehicleNotFoundException {
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        if(vehicle!=null){
            vehicleRepository.delete(vehicle);
        } else {
            throw new VehicleNotFoundException("Zatraženo vozilo ne postoji");
        }
    }


    @Override
    public List<VehicleDetailsDto> getAllCars() {
        return vehicleRepository.findAll().stream().map(VehicleDetailsDto::new).collect(Collectors.toList());
    }

	@Override
	public List<VehicleDetailsDto> getAvailableCars() {
		return vehicleRepository.findByAvailableTrue().stream().map(VehicleDetailsDto::new).collect(Collectors.toList());
	}

	@Override
	public void setAvailable(int id, boolean isAvailable) {
		Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
		vehicle.setAvailable(isAvailable);
		vehicleRepository.save(vehicle);
		
	}

	@Override
	public void changeImage(Integer id, MultipartFile image) {
		Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
		String filePath = "C:\\Users\\Bruno\\Documents\\faks\\rent-a-car-projekt\\rent-a-car-frontend\\public\\carImages\\" + id + ".jpg";
		File dest = new File(filePath);
		if(!dest.exists())
	    {
	       new File(filePath).mkdir();
	    }
	       try {
			image.transferTo(dest);
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
	       vehicle.setImagePath("\\carImages\\" + id + ".jpg");
	       vehicleRepository.save(vehicle);
		
	}

}
