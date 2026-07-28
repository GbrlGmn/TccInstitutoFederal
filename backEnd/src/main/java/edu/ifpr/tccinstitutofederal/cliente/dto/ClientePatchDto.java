package edu.ifpr.tccinstitutofederal.cliente.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientePatchDto {

    private String nome;
    private String telefone;
    private String email;
    private String endereco;
    private String cidade;
    private String uf;
    private String cep;
    private String ncasa;
    private Boolean status;
}
