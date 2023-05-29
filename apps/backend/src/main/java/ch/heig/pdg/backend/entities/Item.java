package ch.heig.pdg.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Item extends AbstractEntity {
    @ManyToOne
    @JoinColumn(nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(nullable = false)
    private ItemModel model;
}
