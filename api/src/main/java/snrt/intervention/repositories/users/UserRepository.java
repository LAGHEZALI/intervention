package snrt.intervention.repositories.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import snrt.intervention.entities.users.User;

import java.util.List;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByPseudo(@Param("pseudo") String pseudo);
    List<User> findByPseudoAndMdp(@Param("pseudo") String pseudo, @Param("mdp") String mdp);
}
