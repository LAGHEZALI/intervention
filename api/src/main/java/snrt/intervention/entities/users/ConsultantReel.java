package snrt.intervention.entities.users;

import javax.persistence.*;

@Entity
public class ConsultantReel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String societe;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSociete() {
        return societe;
    }

    public void setSociete(String societe) {
        this.societe = societe;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
