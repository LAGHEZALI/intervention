package snrt.intervention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import snrt.intervention.entities.Module;

@RepositoryRestResource
public interface ModuleRepository extends JpaRepository<Module, Long> {

}
