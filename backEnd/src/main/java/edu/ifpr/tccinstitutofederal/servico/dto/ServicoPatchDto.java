package edu.ifpr.tccinstitutofederal.servico.dto;

import jakarta.validation.constraints.NotBlank;

public class ServicoPatchDto {

    @NotBlank
    private String nome;
    private String descricao;
}
