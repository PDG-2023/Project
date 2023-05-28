package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Inventory extends AbstractEntity {
    @Column(nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private User owner;

    @ManyToMany
    @JoinTable(
            name = "shared_inventories",
            joinColumns = @JoinColumn(name = "inventory_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users;
}
