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

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(nullable = false)
    private Item item;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Location location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 9)
    private Type type;
}
