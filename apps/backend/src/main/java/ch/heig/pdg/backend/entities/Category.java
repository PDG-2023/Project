package ch.heig.pdg.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Category extends AbstractEntity{
    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private Category parent;
}
