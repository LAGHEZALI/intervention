package snrt.intervention.repositories.intervention;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.Projection;
import snrt.intervention.entities.Module;
import snrt.intervention.entities.User;
import snrt.intervention.entities.intervention.Etape;
import snrt.intervention.entities.intervention.Intervention;

import java.util.List;

@Projection(name = "interventionProjection", types = { Intervention.class })
interface InterventionProjection {
    Long getId();
    String getVersionDoc();
    String getDateDerniereMaj();
    Module getModule();
    Etape getEtape();
    User getUser();
}

@RepositoryRestResource(excerptProjection = InterventionProjection.class)
public interface InterventionRepository extends JpaRepository<Intervention, Long>{

    List<Intervention> findById(@Param("id") Long id);
    List<Intervention> findByUserId(@Param("id") Long id);
    List<Intervention> findByUserPseudo(@Param("pseudo") String pseudo);
    List<Intervention> findByModule_Id(@Param("id") Long id);
    List<Intervention> findByModule_Systeme_Id(@Param("id") Long id);
}
