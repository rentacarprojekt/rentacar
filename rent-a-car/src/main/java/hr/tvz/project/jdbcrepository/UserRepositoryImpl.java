package hr.tvz.project.jdbcrepository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import hr.tvz.project.model.User;

@Repository
public class UserRepositoryImpl implements UserRepository {

	private static final String SELECT_ALL = "SELECT id, jmbag, first_name, last_name, ects_points, date_of_birth FROM student";

	private final JdbcTemplate jdbc;
	private final SimpleJdbcInsert inserter;

	public UserRepositoryImpl(JdbcTemplate jdbc) {
		this.jdbc = jdbc;
		this.inserter = new SimpleJdbcInsert(jdbc).withTableName("users").usingGeneratedKeyColumns("id");
	}

	@Override
	public Set<User> findAll() {
		return Set.copyOf(jdbc.query(SELECT_ALL, this::mapRowToUser));
	}

	@Override
	public Optional<User> findByUsername(String username) {
		try {
			return Optional
					.ofNullable(jdbc.queryForObject(SELECT_ALL + " WHERE username = ?", this::mapRowToUser, username));
		} catch (EmptyResultDataAccessException e) {
			return Optional.empty();
		}
	}

	@Override
	public Optional<User> save(User user) {
		try {
			user.setId(saveUserDetails(user));
			return Optional.of(user);
		} catch (DuplicateKeyException e) {
			return Optional.empty();
		}
	}

	@Override
	public Optional<User> update(String username, User user) {
		int executed = jdbc.update(
				"UPDATE user set " + "first_name = ?, " + "last_name = ?, " + "address = ?, " + "email = ? "
						+ "bio = ? " + "phone_number = ? " + "image_path = ? " + "role = ? " + "WHERE username = ?",
				user.getFirstName(), user.getLastName(), user.getAddress(), user.getEmail(), user.getBio(),
				user.getPhoneNumber(), user.getImagePath(), user.getRole(), user.getUsername());

		if (executed > 0) {
			return Optional.of(user);
		} else {
			return Optional.empty();
		}
	}

	private User mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
		return new User(rs.getInt("id"), rs.getString("first_name"), rs.getString("last_name"),
				rs.getString("username"), rs.getString("password"), rs.getString("address"), rs.getString("email"),
				rs.getString("bio"), rs.getString("phone_number"), rs.getString("image_path"), rs.getString("role"));
	}

	private Integer saveUserDetails(User user) {
		Map<String, Object> values = new HashMap<>();

		values.put("first_name", user.getFirstName());
		values.put("last_name", user.getLastName());
		values.put("username", user.getUsername());
		values.put("password", user.getPassword());
		values.put("address", user.getAddress());
		values.put("email", user.getEmail());
		values.put("bio", user.getBio());
		values.put("phone_number", user.getPhoneNumber());
		values.put("image_path", user.getImagePath());
		values.put("role", user.getRole());

		return inserter.executeAndReturnKey(values).intValue();
	}

}
