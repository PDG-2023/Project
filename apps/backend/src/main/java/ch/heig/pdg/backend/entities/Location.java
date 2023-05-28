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
public class Location extends AbstractEntity {
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT", length = 65535, nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private Location parent;
}
