package edu.ifpr.tccinstitutofederal.servico.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServicoPatchDto {

    @NotBlank
    private String nome;
    private String descricao;
}
