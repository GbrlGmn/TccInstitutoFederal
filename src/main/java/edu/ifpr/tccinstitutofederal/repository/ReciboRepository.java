package edu.ifpr.tccinstitutofederal.repository;

import edu.ifpr.tccinstitutofederal.model.Recibo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReciboRepository extends JpaRepository<Recibo, Long> {
}
