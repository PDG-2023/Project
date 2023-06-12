package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Item extends AbstractEntity {
    @ManyToOne
    @JoinColumn(nullable = false)
    private ItemModel model;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Movement> movements;
}
