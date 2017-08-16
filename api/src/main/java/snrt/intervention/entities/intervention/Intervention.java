package snrt.intervention.entities.intervention;

import snrt.intervention.entities.Module;
import snrt.intervention.entities.User;

import javax.persistence.*;

@Entity
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String versionDoc;
    private String dateDerniereMaj;

    @ManyToOne
    @JoinColumn(name="module_id")
    private Module module;

    @ManyToOne
    @JoinColumn(name="etape_id")
    private Etape etape;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersionDoc() {
        return versionDoc;
    }

    public void setVersionDoc(String versionDoc) {
        this.versionDoc = versionDoc;
    }

    public String getDateDerniereMaj() {
        return dateDerniereMaj;
    }

    public void setDateDerniereMaj(String dateDerniereMaj) {
        this.dateDerniereMaj = dateDerniereMaj;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Etape getEtape() {
        return etape;
    }

    public void setEtape(Etape etape) {
        this.etape = etape;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
