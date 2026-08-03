package edu.ifpr.tccinstitutofederal.funcionario;

import edu.ifpr.tccinstitutofederal.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Optional<Funcionario> findById(Long id);
    List<Funcionario> findByStatusTrue();
}
