package edu.ifpr.tccinstitutofederal.itemOrdem;

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
