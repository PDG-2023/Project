package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Movement extends AbstractEntity {

    public enum Type {
        IN, OUT
    }

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private Item item;

    @OneToOne
    private Location location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 9)
    private Type type;
}
