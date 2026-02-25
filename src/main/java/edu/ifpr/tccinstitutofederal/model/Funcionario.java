package edu.ifpr.tccinstitutofederal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter
@Table (name = "funcionario")
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String endeco;
    private LocalDate dataNasc;
    private String telefone;
    private String cargo;
    private LocalDate dataAdm;
    private LocalDate dataDem;
    private double salario;
    private boolean status;

    @OneToMany(mappedBy = "funcionario")
    private List<OrdemServico> ordemServico;


}
