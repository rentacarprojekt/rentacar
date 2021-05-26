package hr.tvz.project.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	
	User findByUsernameLike(String username);
	User findByEmailLike(String email);
	User findByUsernameLikeAndPasswordLike(String username, String password);
}
