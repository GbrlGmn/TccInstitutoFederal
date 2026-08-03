package edu.ifpr.tccinstitutofederal.itemOrdem;

import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico;
import edu.ifpr.tccinstitutofederal.servico.Servico;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table (name = "item_ordem_servico")
public class ItemOrdemServico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int quantidade;
    private double valorUnitario;
    private double valorTotal;


    @ManyToOne
    @JoinColumn(name = "id_servico")
    private Servico servico;

    @ManyToOne
    @JoinColumn(name = "id_ordem_servico")
    private OrdemServico ordemServico;
}
