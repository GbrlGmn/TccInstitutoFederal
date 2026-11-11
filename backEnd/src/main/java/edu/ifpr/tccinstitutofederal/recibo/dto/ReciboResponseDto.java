package edu.ifpr.tccinstitutofederal.recibo.dto;
import edu.ifpr.tccinstitutofederal.recibo.Recibo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ReciboResponseDto {
    private Long id;
    private Long ordemServicoId;
    private LocalDate dataPagamento;
    private BigDecimal valorPago;
    private Recibo.FormaPagamento formaPagamento;
    private String observacao;

    public static ReciboResponseDto from(Recibo recibo) {
        return new ReciboResponseDto(
                recibo.getId(),
                recibo.getOrdemServico().getId(),
                recibo.getDataPagamento(),
                recibo.getValorPago(),
                recibo.getFormaPagamento(),
                recibo.getObservacao()
        );
    }
}
