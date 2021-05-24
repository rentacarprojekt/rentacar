package hr.tvz.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
