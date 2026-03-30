package edu.ifpr.tccinstitutofederal.repository;

import edu.ifpr.tccinstitutofederal.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
