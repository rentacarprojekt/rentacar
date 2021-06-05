package hr.tvz.project.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import hr.tvz.project.dto.VehicleDetailsDto;
import hr.tvz.project.enums.VehicleManufacturerEnum;
import hr.tvz.project.enums.VehicleTypeEnum;

@Entity
@Table(name = "VEHICLES")
public class Vehicle implements Serializable{

	private static final long serialVersionUID = 2994356713086129050L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String model;
	@Enumerated(EnumType.ORDINAL)
	private VehicleManufacturerEnum manufacturer;
	@Enumerated(EnumType.ORDINAL)
	private VehicleTypeEnum type;
	private Integer mileage;
	@Column(name = "PRODUCTION_YEAR")
	private Integer productionYear;
	private Integer price;
	@Column(name = "IMAGE_PATH")
	private String imagePath;
	private boolean available;
	
	@OneToMany(mappedBy = "vehicle", fetch = FetchType.EAGER)
	private List<Rental> rentalList;
	
	public Vehicle() {
		super();
	}

	public Vehicle(VehicleDetailsDto vehicleDetailsDto) {
		this.model = vehicleDetailsDto.getModel();
		this.manufacturer = vehicleDetailsDto.getManufacturer();
		this.type = vehicleDetailsDto.getType();
		this.mileage = vehicleDetailsDto.getMileage();
		this.productionYear = vehicleDetailsDto.getProductionYear();
		this.price = vehicleDetailsDto.getPrice();
		this.imagePath = vehicleDetailsDto.getImagePath();
		this.available = vehicleDetailsDto.isAvailable();
	}

	public Vehicle(int id, String model, String manufacturer, String type, String mileage, int productionYear, int price, String imagePath, boolean available) {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public VehicleManufacturerEnum getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(VehicleManufacturerEnum manufacturer) {
		this.manufacturer = manufacturer;
	}

	public VehicleTypeEnum getType() {
		return type;
	}

	public void setType(VehicleTypeEnum type) {
		this.type = type;
	}

	public Integer getMileage() {
		return mileage;
	}

	public void setMileage(Integer mileage) {
		this.mileage = mileage;
	}

	public Integer getProductionYear() {
		return productionYear;
	}

	public void setProductionYear(Integer productionYear) {
		this.productionYear = productionYear;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public List<Rental> getRentalList() {
		return rentalList;
	}

	public void setRentalList(List<Rental> rentalList) {
		this.rentalList = rentalList;
	}

}
