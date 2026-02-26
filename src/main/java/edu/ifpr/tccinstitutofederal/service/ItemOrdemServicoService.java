package edu.ifpr.tccinstitutofederal.service;

import edu.ifpr.tccinstitutofederal.model.ItemOrdemServico;
import edu.ifpr.tccinstitutofederal.repository.ItemOrdemServicoRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemOrdemServicoService {
    private final ItemOrdemServicoRepository Repository;
    public ItemOrdemServicoService(ItemOrdemServicoRepository Repository) {
        this.Repository = Repository;
    }

}
