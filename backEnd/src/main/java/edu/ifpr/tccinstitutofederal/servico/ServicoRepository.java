package edu.ifpr.tccinstitutofederal.servico;

import edu.ifpr.tccinstitutofederal.ordemServico.ItemOrdemServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<ItemOrdemServico, Long> {
}
