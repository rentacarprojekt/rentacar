package hr.tvz.project.jdbcrepository;

import hr.tvz.project.model.Rental;
import hr.tvz.project.model.User;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;


public class RentalRepositoryImpl implements RentalRepository{

    private static final String SELECT_ALL = "SELECT id, jmbag, first_name, last_name, ects_points, date_of_birth FROM student";


    private final JdbcTemplate jdbc;
    private final SimpleJdbcInsert inserter;

    public RentalRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
        this.inserter = new SimpleJdbcInsert(jdbc).withTableName("rental").usingGeneratedKeyColumns("id");
    }


    @Override
    public Set<Rental> findAll() {
        return Set.copyOf(jdbc.query(SELECT_ALL, this::mapRowToRental));
    }

    @Override
    public Optional<Rental> findByUser(User user) {
        try {
            return Optional
                    .ofNullable(jdbc.queryForObject(SELECT_ALL + " WHERE user = ?", this::mapRowToRental, user));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    private Rental mapRowToRental(ResultSet resultSet, int rowNum) throws SQLException {
        return new Rental(resultSet.getInt("id"), resultSet.getString("user"), resultSet.getString("vehicle"),
                resultSet.getString("dateFrom"), resultSet.getString("dateTo"), resultSet.getString("returnDate"));

    }

    @Override
    public Optional<Rental> save(Rental rental) {
        try {
            rental.setId(saveRentalDetails(rental));
            return Optional.of(rental);
        } catch (DuplicateKeyException e) {
            return Optional.empty();
        }
    }

    private Integer saveRentalDetails(Rental rental) {
        Map<String, Object> values = new HashMap<>();

        values.put("user", rental.getUser());
        values.put("vehicle", rental.getVehicle());
        values.put("dateFrom", rental.getDateFrom());
        values.put("dateTo", rental.getDateTo());
        values.put("returnDate", rental.getReturnDate());

        return inserter.executeAndReturnKey(values).intValue();
    }

    @Override
    public Optional<Rental> delete(Rental rental) {
        int executed = jdbc.update(
                "DELETE rental set " + "vehicle = ?, " + "dateFrom = ?, " + "dateTo = ? "
                        + "returnDate = ? " + "WHERE user = ?",
                rental.getVehicle(), rental.getDateFrom(), rental.getDateTo(), rental.getReturnDate(),
                rental.getUser());

        if (executed > 0) {
            return Optional.of(rental);
        } else {
            return Optional.empty();
        }
    }
}
