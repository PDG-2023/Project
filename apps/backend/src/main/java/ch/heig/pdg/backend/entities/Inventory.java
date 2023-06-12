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

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(nullable = false)
    private User owner;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "shared_inventories",
            joinColumns = @JoinColumn(name = "inventory_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users;

    @OneToMany(mappedBy = "inventory", cascade = CascadeType.ALL)
    private List<Category> categories;

    @OneToMany(mappedBy = "inventory", cascade = CascadeType.ALL)
    private List<Location> locations;

    @OneToMany(mappedBy = "inventory", cascade = CascadeType.ALL)
    private List<ItemModel> itemModels;
}
