package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Item extends AbstractEntity {
    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private ItemModel model;
}
