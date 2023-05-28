package ch.heig.pdg.backend.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
abstract public class AbstractEntity {
    @Id
    @Setter(AccessLevel.NONE)
    @Column(nullable = false)
    protected Integer id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    protected LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    protected LocalDateTime updatedAt;
}
