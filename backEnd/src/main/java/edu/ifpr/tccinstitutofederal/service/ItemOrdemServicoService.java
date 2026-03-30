package edu.ifpr.tccinstitutofederal.service;

import edu.ifpr.tccinstitutofederal.model.ItemOrdemServico;
import edu.ifpr.tccinstitutofederal.repository.ItemOrdemServicoRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemOrdemServicoService {
    private final ItemOrdemServicoRepository repository;

    public ItemOrdemServicoService(ItemOrdemServicoRepository repository) {
        this.repository = repository;
    }
    public ItemOrdemServico adicionarItemOrdemServico(ItemOrdemServico itemOrdemServico) {
        return repository.save(itemOrdemServico);
    }

}
