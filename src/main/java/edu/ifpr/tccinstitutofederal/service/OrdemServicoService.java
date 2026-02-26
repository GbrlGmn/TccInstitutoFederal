package edu.ifpr.tccinstitutofederal.service;

import edu.ifpr.tccinstitutofederal.model.OrdemServico;
import edu.ifpr.tccinstitutofederal.repository.OrdemServicoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;


@Service
public class OrdemServicoService {
    private final OrdemServicoRepository repository;

    public OrdemServicoService(OrdemServicoRepository repository) {
        this.repository = repository;
    }

    public OrdemServico criarOrdemServico(OrdemServico os) {
        os.setStatus(OrdemServico.StatusOrder.ORCAMENTO);
        os.setDataOs(LocalDate.now());
        return repository.save(os);
    }

    public OrdemServico atualizarStatus(Long id, OrdemServico.StatusOrder novoStatus) {
        OrdemServico os = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordem de Serviço não encontrada"));
        os.setStatus(novoStatus);
        return repository.save(os);
    }
}
