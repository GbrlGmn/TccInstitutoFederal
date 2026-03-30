package edu.ifpr.tccinstitutofederal.repository;

import edu.ifpr.tccinstitutofederal.model.ItemOrdemServico;
import edu.ifpr.tccinstitutofederal.model.OrdemServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {
    List<OrdemServico> findByStatus(OrdemServico.StatusOrder status);
}
