package edu.ifpr.tccinstitutofederal.ordemServico.dto;

import edu.ifpr.tccinstitutofederal.itemOrdem.dto.ItemOrdemServicoResponseDto;
import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrdemServicoResponseDto {
    private Long id;
    private LocalDate dataAbertura;
    private LocalDate dataFechamento;
    private OrdemServico.StatusOrder status;
    private BigDecimal valorOrdemServico;
    private BigDecimal porcentagem;
    private BigDecimal valorTotal;
    private BigDecimal valorPago;
    private BigDecimal valorPendente;
    private Long clienteId;
    private String clienteNome;
    private Long funcionarioId;
    private String funcionarioNome;
    private List<ItemOrdemServicoResponseDto> itens;

    public static OrdemServicoResponseDto from(OrdemServico os) {
        return new OrdemServicoResponseDto(
                os.getId(),
                os.getDataAbertura(),
                os.getDataFechamento(),
                os.getStatus(),
                os.getValorOrdemServico(),
                os.getPorcentagem(),
                os.getValorTotal(),
                os.getValorPago(),
                os.getValorPendente(),
                os.getCliente().getId(),
                os.getCliente().getNome(),
                os.getFuncionario() != null ? os.getFuncionario().getId() : null,
                os.getFuncionario() != null ? os.getFuncionario().getNome() : null,
                os.getItens().stream().map(ItemOrdemServicoResponseDto::from).toList()
        );
    }
}
