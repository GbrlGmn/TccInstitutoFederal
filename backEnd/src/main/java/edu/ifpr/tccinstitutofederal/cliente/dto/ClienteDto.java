package edu.ifpr.tccinstitutofederal.cliente.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.validator.constraints.br.CPF;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ClienteDto{

     @NotBlank(message = "Nome é obrigatório")
     private String nome;

     @NotBlank(message = "CPF é obrigatório")
     @CPF(message = "CPF inválido")
     private String cpf;

     @NotBlank
     private String telefone;

     @Email(message = "Email inválido")
     @NotBlank
     private String email;

     private String localTrabalho;

     @NotBlank
     private String endereco;

     private String cidade;
     private String uf;

     @NotBlank
     @Pattern(regexp = "\\d{8}", message = "CEP deve ter 8 dígitos")
     private String cep;

     @NotBlank
     private String nCasa;
     private boolean status = true;
}
