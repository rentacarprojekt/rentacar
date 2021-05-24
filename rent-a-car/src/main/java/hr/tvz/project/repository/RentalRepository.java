package hr.tvz.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.Rental;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Integer>{

}
