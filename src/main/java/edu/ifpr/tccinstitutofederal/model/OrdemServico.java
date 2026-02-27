package edu.ifpr.tccinstitutofederal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "ordem_servico")
public class OrdemServico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate dataAbertura;
    private LocalDate dataFechamento;
    private double valorMaterial;
    private double valorFinal;
    private double valorPago;
    private String formaPagamento;
    private String observacao;
    @Enumerated(EnumType.STRING)
    private StatusOrder status;

    public enum StatusOrder {
        ORCAMENTO,
        ABERTA,
        EM_ANDAMENTO,
        FINALIZADA,
        CANCELADA
    }
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;

    @OneToMany(mappedBy = "ordemServico")
    private List<ItemOrdemServico> itens;

    // pelo o que eu estou vendo, talvez eu preciso
}
