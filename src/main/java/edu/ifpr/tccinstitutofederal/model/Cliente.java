package edu.ifpr.tccinstitutofederal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
@Table (name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;
    private String RG;
    private String CPF;
    private String telefone;
    private String email;
    private String localTrabalho;
    private String endereco;
    private String cidade;
    private String uf;
    private String cep;
    private String nCasa;
    private boolean Status;

    @OneToMany(mappedBy = "cliente")
    private List<OrdemServico> ordemServico;
}
