package edu.ifpr.tccinstitutofederal.itemOrdem.dto;

import edu.ifpr.tccinstitutofederal.itemOrdem.ItemOrdemServico;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ItemOrdemServicoResponseDto {
    private Long id;
    private Long servicoId;
    private String servicoNome;
    private Integer quantidade;

    public static ItemOrdemServicoResponseDto from(ItemOrdemServico item) {
        return new ItemOrdemServicoResponseDto(
                item.getId(),
                item.getServico().getId(),
                item.getServico().getNome(),
                item.getQuantidade()
        );
    }
}
