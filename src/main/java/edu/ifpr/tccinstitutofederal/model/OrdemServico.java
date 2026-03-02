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
    @Enumerated(EnumType.STRING)
    private StatusOrder status;
    private double valorOrdemServico;
    private byte porcentagem;



    public enum StatusOrder {
        ORCAMENTO,
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

    @OneToMany
    @JoinColumn(name = "id_pagamento")
    private List<Recibo> pagamentos;

    @OneToMany(mappedBy = "ordemServico")
    private List<ItemOrdemServico> itens;

    public double calcularTotal(double valorOrdemServico, byte porcentagem){
    double valorTotal = valorOrdemServico + (valorOrdemServico / porcentagem);
        return valorTotal;
    }

}
