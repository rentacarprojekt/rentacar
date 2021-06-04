package hr.tvz.project.jdbcrepository;

import hr.tvz.project.model.Rental;
import hr.tvz.project.model.User;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.*;

@Profile("dev")
@Repository
public class MockRentalRepository implements JdbcRentalRepository{

    private final Set<Rental> MOCKED_RENTALS = new HashSet<>(
            Arrays.asList(
                    new Rental(1, "Ivan Zovkić","Mercedes AMG", "12.2.2021","1.3.2022","5.5.2022"),
                    new Rental(1, "Marko Andlar","Toyota RAV", "3.2.2022","4.3.2022","6.3.2022")
            )
    );


    @Override
    public Set<Rental> findAll() {
        return MOCKED_RENTALS;
    }

    @Override
    public Optional<Rental> findByUser(User user) {
        return MOCKED_RENTALS.stream().filter(rental -> rental.getUser().equals(user)).findAny();
    }

    @Override
    public Optional<Rental> save(Rental rental) {
        if(!MOCKED_RENTALS.contains(rental)){
            MOCKED_RENTALS.add(rental);
            return Optional.of(rental);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Rental> delete(Rental rental) {
        boolean exists = MOCKED_RENTALS.removeIf(
                rental1 -> Objects.equals(rental1.getUser(), rental.getUser())
        );

        if(exists){
            MOCKED_RENTALS.remove(rental);
            return Optional.of(rental);
        } else {
            return Optional.empty();
        }    }
}
