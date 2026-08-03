package edu.ifpr.tccinstitutofederal.funcionario.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class FuncionarioPatchDto {
    private String nome;
    private String endereco;
    private LocalDate dataNasc;
    private String telefone;
    private String cargo;
    private LocalDate dataAdmissao;
    private LocalDate dataDemicao;
    private BigDecimal salario;
    private boolean status;
}
