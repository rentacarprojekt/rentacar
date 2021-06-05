package hr.tvz.project.jdbcrepository;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.User;

@Profile("dev")
@Repository
public class MockUserRepository implements JdbcUserRepository{
	
	private final Set<User> MOCKED_USERS = new HashSet<>(
            Arrays.asList(
                    new User(1, "Bruno", "Pavić", "bpavic", "lozinka123", "adresa 1", "bpavic@tvz.hr", "Opis profila", "0911234567", null, "ADMIN"),
                    new User(2, "Marko", "Andlar", "mandlar", "lozinka123", "adresa 2", "mandlar@tvz.hr", "Opis profila", "0911234567", null, "USER")
            )
    );

	@Override
	public Set<User> findAll() {
		return MOCKED_USERS;
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return MOCKED_USERS.stream().filter(user -> user.getUsername().equals(username)).findAny();
	}

	@Override
	public Optional<User> save(User user) {
        if(!MOCKED_USERS.contains(user)){
        	MOCKED_USERS.add(user);
            return Optional.of(user);
        } else {
            return Optional.empty();
        }
	}

	@Override
	public Optional<User> update(String username, User user) {
        boolean exists = MOCKED_USERS.removeIf(
                it -> Objects.equals(it.getUsername(), username) && Objects.equals(it.getUsername(), user.getUsername())
        );
        
        if(exists){
        	MOCKED_USERS.add(user);
            return Optional.of(user);
        } else {
            return Optional.empty();
        }
	}

}
