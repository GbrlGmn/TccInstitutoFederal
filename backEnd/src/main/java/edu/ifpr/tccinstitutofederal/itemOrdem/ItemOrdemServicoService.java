package edu.ifpr.tccinstitutofederal.itemOrdem;

import edu.ifpr.tccinstitutofederal.itemOrdem.dto.ItemOrdemServicoRequestDto;
import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico;
import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServicoRepository;
import edu.ifpr.tccinstitutofederal.servico.Servico;
import edu.ifpr.tccinstitutofederal.servico.ServicoRepository;
import edu.ifpr.tccinstitutofederal.shared.exception.RecursoNaoEncontradoException;
import edu.ifpr.tccinstitutofederal.shared.exception.RegraDeNegocioException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemOrdemServicoService {
    private final ItemOrdemServicoRepository repository;
    private final OrdemServicoRepository ordemServicoRepository;
    private final ServicoRepository servicoRepository;

    @Transactional
    public void adicionarItem(Long ordemServicoId, ItemOrdemServicoRequestDto dto) {
        OrdemServico os = buscarOrdemEmOrcamento(ordemServicoId);

        Servico servico = servicoRepository.findById(dto.getServicoId())
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Serviço não encontrado: id " + dto.getServicoId()));

        boolean jaExiste = os.getItens().stream()
                .anyMatch(i -> i.getServico().getId().equals(servico.getId()));
        if (jaExiste) {
            throw new RegraDeNegocioException(
                    "Esse serviço já está na OS. Altere a quantidade do item existente.");
        }

        os.adicionarItem(ItemOrdemServico.builder()
                .servico(servico)
                .quantidade(dto.getQuantidade())
                .build());

        ordemServicoRepository.save(os);
    }

    @Transactional
    public void removerItem(Long ordemServicoId, Long itemId) {
        OrdemServico os = buscarOrdemEmOrcamento(ordemServicoId);

        boolean removido = os.getItens().removeIf(i -> i.getId().equals(itemId));
        if (!removido) {
            throw new RecursoNaoEncontradoException(
                    "Item não encontrado nessa OS: id " + itemId);
        }
        ordemServicoRepository.save(os);
    }

    private OrdemServico buscarOrdemEmOrcamento(Long id) {
        OrdemServico os = ordemServicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Ordem de serviço não encontrada: id " + id));

        if (os.getStatus() != OrdemServico.StatusOrder.ORCAMENTO) {
            throw new RegraDeNegocioException(
                    "Só é possível alterar itens enquanto a OS está em orçamento.");
        }
        return os;
    }

}
