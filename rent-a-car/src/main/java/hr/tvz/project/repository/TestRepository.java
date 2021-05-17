package hr.tvz.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.Test;

@Repository
public interface TestRepository extends JpaRepository<Test, Long>{

}
