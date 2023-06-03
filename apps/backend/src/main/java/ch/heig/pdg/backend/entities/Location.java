package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Location extends AbstractEntity {
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT", length = 65535, nullable = false)
    private String description;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private Location parent;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Inventory inventory;
}
