package edu.ifpr.tccinstitutofederal.servico.dto;
import edu.ifpr.tccinstitutofederal.servico.Servico;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ServicoResponseDto {
    private Long id;
    private String nome;
    private String descricao;

    public static ServicoResponseDto from(Servico servico) {
        return new ServicoResponseDto(
                servico.getId(),
                servico.getNome(),
                servico.getDescricao()
        );
    }
}
