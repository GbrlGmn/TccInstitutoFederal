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

    @OneToMany(mappedBy = "ordemServico") // Tem que ser exatamente "ordemServico"
    private List<Recibo> pagamentos; // Ou recibos, como preferir chamar a lista

    @OneToMany(mappedBy = "ordemServico")
    private List<ItemOrdemServico> itens;

    public double getValorTotal() {
        // Evita divisão por zero se a porcentagem for 0
        if (this.porcentagem == 0) return this.valorOrdemServico;

        return this.valorOrdemServico + (this.valorOrdemServico * (this.porcentagem / 100.0));
    }

}
