package edu.ifpr.tccinstitutofederal.servico.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServicoRequestDto{
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private String descricao;
}
