package edu.ifpr.tccinstitutofederal.ordemServico.dto;

import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrdemServicoStatusDto {
    @NotNull(message = "Status é obrigatório")
    private OrdemServico.StatusOrder status;
}
