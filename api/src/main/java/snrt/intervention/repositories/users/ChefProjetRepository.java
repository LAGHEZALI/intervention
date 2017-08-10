package snrt.intervention.repositories.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import snrt.intervention.entities.users.ChefProjet;

@RepositoryRestResource
public interface ChefProjetRepository extends JpaRepository<ChefProjet, Long> {
}
