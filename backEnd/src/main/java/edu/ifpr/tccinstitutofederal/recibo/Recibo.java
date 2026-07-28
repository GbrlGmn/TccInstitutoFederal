package edu.ifpr.tccinstitutofederal.recibo;

import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter @Setter
public class Recibo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate dataPagamento;
    private double valorPago;
    private String formaPagamento;
    private String observacao;
    private double valorMaterial;
    private double valorFinal;

    @ManyToOne
    @JoinColumn(name = "id_ordem_servico")
    private OrdemServico ordemServico;

}
