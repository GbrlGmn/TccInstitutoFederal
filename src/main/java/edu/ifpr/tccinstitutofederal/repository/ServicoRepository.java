package edu.ifpr.tccinstitutofederal.repository;

import edu.ifpr.tccinstitutofederal.model.ItemOrdemServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<ItemOrdemServico, Long> {
}
