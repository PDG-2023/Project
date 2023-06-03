package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Category extends AbstractEntity {
    @Column(nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    private Category parent;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Inventory inventory;
}
