package edu.ifpr.tccinstitutofederal.ordemServico.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;


public class OrdemServicoRequestDto {

    private Long clienteId;

    private Long servicoId;

    private Long funcionarioId;

    private Long reciboId;

    private StatusOrdemServico statusOrdemServico;

    @NotNull
    private BigDecimal valorOrdemServico;

    @NotNull
    private BigDecimal porcentagem;

    public enum StatusOrdemServico {

        EM_ANDAMENTO,
        FINALIZADA,
        CANCELADA
    }
}
