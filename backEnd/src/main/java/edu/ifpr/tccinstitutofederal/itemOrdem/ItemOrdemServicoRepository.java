package edu.ifpr.tccinstitutofederal.itemOrdem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemOrdemServicoRepository extends JpaRepository<ItemOrdemServico, Long> {

}
