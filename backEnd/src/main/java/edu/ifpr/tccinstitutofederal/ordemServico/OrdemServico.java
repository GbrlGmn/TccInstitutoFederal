package edu.ifpr.tccinstitutofederal.ordemServico;

import edu.ifpr.tccinstitutofederal.cliente.Cliente;
import edu.ifpr.tccinstitutofederal.funcionario.Funcionario;
import edu.ifpr.tccinstitutofederal.itemOrdem.ItemOrdemServico;
import edu.ifpr.tccinstitutofederal.recibo.Recibo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "ordem_servico")
@NoArgsConstructor
@AllArgsConstructor
public class OrdemServico {

    // Relacionamentos
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;

    @OneToMany(mappedBy = "ordemServico")
    private List<Recibo> pagamentos = new ArrayList<>();

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemOrdemServico> itens = new ArrayList<>();

    // Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "data_abertura")
    private LocalDate dataAbertura;

    @Column(name = "data_fechamento")
    private LocalDate dataFechamento;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_order")
    private StatusOrder status;

    @Column(name = "valor_ordem_servico", nullable = false)
    private BigDecimal valorOrdemServico;

    @Column(nullable = false)
    private BigDecimal porcentagem;

    public enum StatusOrder {
        ORCAMENTO,
        EM_ANDAMENTO,
        FINALIZADA,
        CANCELADA
    }

    public void adicionarItem(ItemOrdemServico item) {
        item.setOrdemServico(this);
        this.itens.add(item);
    }

    public void adicionarPagamento(Recibo recibo) {
        recibo.setOrdemServico(this);
        this.pagamentos.add(recibo);
    }

    public BigDecimal getValorTotal() {
        if (this.porcentagem.compareTo(BigDecimal.ZERO) == 0) {
            return this.valorOrdemServico.setScale(2, RoundingMode.HALF_UP);
        }
        BigDecimal percentual = this.porcentagem.divide(BigDecimal.valueOf(100));
        return this.valorOrdemServico
                .add(this.valorOrdemServico.multiply(percentual))
                .setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal getValorPago() {
        return pagamentos.stream()
                .map(Recibo::getValorPago)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal getValorPendente() {
        return getValorTotal().subtract(getValorPago());
    }

}
