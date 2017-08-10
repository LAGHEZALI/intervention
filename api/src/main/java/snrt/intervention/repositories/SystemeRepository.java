package snrt.intervention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import snrt.intervention.entities.Systeme;

import java.util.List;

@RepositoryRestResource
public interface SystemeRepository extends JpaRepository<Systeme, Long> {
}
