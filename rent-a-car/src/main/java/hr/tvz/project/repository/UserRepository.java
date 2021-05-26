package hr.tvz.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import hr.tvz.project.dto.UserRegistrationDto;
import hr.tvz.project.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
}
