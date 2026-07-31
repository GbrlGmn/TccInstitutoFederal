package edu.ifpr.tccinstitutofederal.funcionario;

import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter
@Table (name = "funcionario")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Funcionario {

    //relacionamentos
    @OneToMany(mappedBy = "funcionario")
    private List<OrdemServico> ordemServico;

    //atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private LocalDate dataNasc;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String cargo;

    @Column(nullable = false)
    private LocalDate dataAdmissao;

    @Column(nullable = false)
    private LocalDate dataDemicao;

    @Column(nullable = false)
    private BigDecimal salario;

    // status ativo desativo
    private boolean status;
}
