package hr.tvz.project.jdbcrepository;

import java.util.Optional;
import java.util.Set;

import hr.tvz.project.model.User;

public interface UserRepository {
	
	Set<User> findAll();
	Optional<User> findByUsername(String username);
	Optional<User> save(User user);
	Optional<User> update(String username, User user);

}
