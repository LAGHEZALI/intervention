package snrt.intervention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import snrt.intervention.entities.CodeInscription;

import java.util.List;

@RepositoryRestResource
public interface CodeInscriptionRepository extends JpaRepository<CodeInscription, Long> {
    List<CodeInscription> findByCodeAndTypeAndDateUtilisation(@Param("code") String code ,
                                                              @Param("type") String type ,
                                                              @Param("date") String date
                                                              );

}
