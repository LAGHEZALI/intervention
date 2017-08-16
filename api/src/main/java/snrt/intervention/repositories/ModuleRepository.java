package snrt.intervention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.Projection;
import snrt.intervention.entities.Module;
import snrt.intervention.entities.Systeme;

import java.util.List;

@Projection(name = "moduleProjection", types = { Module.class })
interface ModuleProjection {
    Long getId();
    String getNom();
    Systeme getSysteme();
}

@RepositoryRestResource(excerptProjection = ModuleProjection.class)
public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findByNom(@Param("nom") String nom);
    List<Module> findBySystemeId(@Param("id") Long id);
    List<Module> findBySystemeNom(@Param("nom") String nom);
}
