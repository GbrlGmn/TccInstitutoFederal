package edu.ifpr.tccinstitutofederal.repository;

import edu.ifpr.tccinstitutofederal.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
