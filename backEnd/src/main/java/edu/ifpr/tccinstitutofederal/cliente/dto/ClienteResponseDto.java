package edu.ifpr.tccinstitutofederal.cliente.dto;

import edu.ifpr.tccinstitutofederal.cliente.Cliente;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ClienteResponseDto {

    private Long id;
    private String nome;
    private String cpf;
    private String telefone;
    private String email;
    private String localTrabalho;
    private String endereco;
    private String cidade;
    private String uf;
    private String cep;
    private String ncasa;
    private boolean status;

    public static ClienteResponseDto from(Cliente cliente) {

        return new ClienteResponseDto(
                cliente.getId(),
                cliente.getNome(),
                cliente.getCpf(),
                cliente.getTelefone(),
                cliente.getEmail(),
                cliente.getLocalTrabalho(),
                cliente.getEndereco(),
                cliente.getCidade(),
                cliente.getUf(),
                cliente.getCep(),
                cliente.getNcasa(),
                cliente.isStatus()
        );
    }
}