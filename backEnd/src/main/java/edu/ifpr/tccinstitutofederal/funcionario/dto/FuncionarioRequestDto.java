package edu.ifpr.tccinstitutofederal.funcionario.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FuncionarioRequestDto {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private String endereco;

    @NotNull(message = "Data de nascimento é obrigatória")
    private LocalDate dataNasc;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    @NotBlank(message = "Cargo é obrigatório")
    private String cargo;

    private LocalDate dataAdmissao;

    @NotNull(message = "Salário é obrigatório")
    private BigDecimal salario;

    // status ativo/desativo
    private boolean status;

}
