package hr.tvz.project.jdbcrepository;

import hr.tvz.project.model.User;

import java.util.Optional;
import java.util.Set;

public interface JdbcUserRepository {

    Set<User> findAll();
    Optional<User> findByUsername(String username);
    Optional<User> save(User user);
    Optional<User> update(String username, User user);

}
