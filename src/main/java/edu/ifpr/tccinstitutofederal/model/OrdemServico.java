package edu.ifpr.tccinstitutofederal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "ordem_servico")
public class OrdemServico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Relacionamento com as outras entidades
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "id_funcionario")
    private Employee employee;

    @OneToMany(mappedBy = "ordemServico")
    private List<ItemOrdemServico> itens;

    private Date dataOs;
    private Date dataTermino;
    @Enumerated(EnumType.STRING)
    private StatusOrder status;

    public enum StatusOrder {
        ABERTA,
        EM_ANDAMENTO,
        FINALIZADA,
        CANCELADA
    }

}
