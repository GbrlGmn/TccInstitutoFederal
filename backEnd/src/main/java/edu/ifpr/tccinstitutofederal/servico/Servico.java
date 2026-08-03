package edu.ifpr.tccinstitutofederal.servico;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Table(name = "servico")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    private String descricao;

}
