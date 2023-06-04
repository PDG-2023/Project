package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Item extends AbstractEntity {
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(nullable = false)
    private ItemModel model;
}
