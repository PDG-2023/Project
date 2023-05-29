package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Table(name = "application_user") // This is need because postgres does not allow a table called user
@Data
@EqualsAndHashCode(callSuper = true)
public class User extends AbstractEntity {
    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "owner")
    private List<Inventory> ownedInventories;

    @ManyToMany
    @JoinTable(
            name = "shared_inventories",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "inventory_id"))
    private List<Inventory> sharedInventories;
}
