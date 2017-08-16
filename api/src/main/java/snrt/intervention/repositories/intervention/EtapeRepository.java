package snrt.intervention.repositories.intervention;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import snrt.intervention.entities.intervention.Etape;

@RepositoryRestResource
public interface EtapeRepository extends JpaRepository<Etape, Long>{
}
