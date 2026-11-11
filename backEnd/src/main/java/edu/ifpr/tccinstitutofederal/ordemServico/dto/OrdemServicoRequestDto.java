package edu.ifpr.tccinstitutofederal.ordemServico.dto;

import edu.ifpr.tccinstitutofederal.itemOrdem.dto.ItemOrdemServicoRequestDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class OrdemServicoRequestDto {

    @NotNull(message = "Cliente é obrigatório")
    private Long clienteId;

    private Long funcionarioId;

    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser maior que zero")
    private BigDecimal valorOrdemServico;

    @NotNull(message = "Porcentagem é obrigatória")
    @PositiveOrZero(message = "Porcentagem não pode ser negativa")
    private BigDecimal porcentagem;

    @NotEmpty(message = "A OS precisa ter pelo menos um item")
    @Valid
    private List<ItemOrdemServicoRequestDto> itens;
}
