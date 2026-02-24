package edu.ifpr.tccinstitutofederal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Entity
@Getter @Setter
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private double valor;
    private Time tempoMedio;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "id_grupo_servico")
    private GrupoServico grupoServico;
}
