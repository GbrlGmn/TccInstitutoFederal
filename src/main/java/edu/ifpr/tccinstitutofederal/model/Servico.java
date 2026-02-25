package edu.ifpr.tccinstitutofederal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.List;

@Entity
@Getter @Setter
@Table (name = "servico")
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private Time tempoMedio;
    private boolean status;

    @OneToMany (mappedBy = "servico")
    private List<ItemOrdemServico> itensOrdemServico;

}
