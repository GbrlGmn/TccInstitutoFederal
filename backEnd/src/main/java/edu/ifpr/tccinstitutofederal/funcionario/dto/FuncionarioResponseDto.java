package edu.ifpr.tccinstitutofederal.funcionario.dto;

import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteResponseDto;
import edu.ifpr.tccinstitutofederal.funcionario.Funcionario;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class FuncionarioResponseDto {
    private long id;
    private String nome;
    private String endereco;
    private LocalDate dataNasc;
    private String telefone;
    private String cargo;
    private LocalDate dataAdmissao;
    private LocalDate dataDemicao;
    private BigDecimal salario;
    private boolean status;

    public static FuncionarioResponseDto from(Funcionario funcionario) {

        return new FuncionarioResponseDto(
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getEndereco(),
                funcionario.getDataNasc(),
                funcionario.getTelefone(),
                funcionario.getCargo(),
                funcionario.getDataAdmissao(),
                funcionario.getDataDemicao(),
                funcionario.getSalario(),
                funcionario.isStatus()
        );
    }
}
