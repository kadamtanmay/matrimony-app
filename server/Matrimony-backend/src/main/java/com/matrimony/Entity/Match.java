package com.matrimony.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user who initiated the match
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // The matched user
    @ManyToOne
    @JoinColumn(name = "matched_user_id", nullable = false)
    private User matchedUser;

    @Column(name = "matched_on", nullable = false)
    private LocalDateTime matchedOn;

    @Column(name = "status", nullable = false)
    private String status; // e.g. "PENDING", "ACCEPTED", "REJECTED"
}
