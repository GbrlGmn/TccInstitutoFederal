package edu.ifpr.tccinstitutofederal.recibo.dto;

import edu.ifpr.tccinstitutofederal.recibo.Recibo;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReciboRequestDto {
    @NotNull(message = "Ordem de serviço é obrigatória")
    private Long ordemServicoId;

    @NotNull(message = "Valor é obrigatório")
    @DecimalMin(value = "0.01", message = "Valor deve ser de pelo menos R$ 0,01")
    private BigDecimal valorPago;

    @NotNull(message = "Forma de pagamento é obrigatória")
    private Recibo.FormaPagamento formaPagamento;

    @PastOrPresent(message = "Data do pagamento não pode ser futura")
    private LocalDate dataPagamento;

    private String observacao;
}
