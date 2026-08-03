package edu.ifpr.tccinstitutofederal.funcionario;


import edu.ifpr.tccinstitutofederal.cliente.Cliente;
import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteResponseDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioPatchDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioRequestDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioResponseDto;
import edu.ifpr.tccinstitutofederal.shared.exception.RecursoNaoEncontradoException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public List<FuncionarioResponseDto> findAll() {
        return funcionarioRepository.findAll()
                .stream()
                .map(FuncionarioResponseDto::from)
                .toList();
    }

    public FuncionarioResponseDto findById(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id).
                orElseThrow(() -> new RecursoNaoEncontradoException("Funcionario não encontrado: id " + id));
        return FuncionarioResponseDto.from(funcionario);
    }

    @Transactional
    public void save(FuncionarioRequestDto dto) {
        Funcionario funcionario = Funcionario.builder()
                .nome(dto.getNome())
                .endereco(dto.getEndereco())
                .dataNasc(dto.getDataNasc())
                .telefone(dto.getTelefone())
                .cargo(dto.getCargo())
                .dataAdmissao(dto.getDataAdmissao())
                .salario(dto.getSalario())
                .status(dto.isStatus())
                .build();

        funcionario.setStatus(true);
        funcionarioRepository.save(funcionario);


    }


    @Transactional
    public FuncionarioResponseDto deleteById(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Funcionario nao encontrado"));
        if (funcionario.isStatus()) {
            funcionario.setStatus(false);
        }else {
            System.out.println("erro ao tentar deletar funcionario");
        }
        Funcionario atualizado = funcionarioRepository.save(funcionario);
        return FuncionarioResponseDto.from(atualizado);

    }

    @Transactional
    public FuncionarioResponseDto reactiveFuncionario(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Funcionario nao encontrado"));
        if (!funcionario.isStatus()) {
            funcionario.setStatus(true);
        }else  {
            System.out.println("Funcionario nao encontrado");
        }
        Funcionario atualizado = funcionarioRepository.save(funcionario);
        return FuncionarioResponseDto.from(atualizado);
    }



    @Transactional
    public FuncionarioResponseDto patch(FuncionarioPatchDto dto, Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Funcionario não encontrado: id " + id));

        if (dto.getNome() != null) {
            funcionario.setNome(dto.getNome());
        }
        if (dto.getEndereco() != null) {
            funcionario.setEndereco(dto.getEndereco());
        }
        if (dto.getDataNasc() != null) {
            funcionario.setDataNasc(dto.getDataNasc());
        }
        if (dto.getTelefone() != null) {
            funcionario.setTelefone(dto.getTelefone());
        }
        if (dto.getCargo() != null) {
            funcionario.setCargo(dto.getCargo());
        }
        if (dto.getDataAdmissao() != null) {
            funcionario.setDataAdmissao(dto.getDataAdmissao());

        }
        if (dto.getDataDemicao() != null) {
            funcionario.setDataDemicao(dto.getDataDemicao());
            funcionario.setStatus(false);
        }
        if (dto.getSalario() != null) {
            funcionario.setSalario(dto.getSalario());
        }
        funcionarioRepository.save(funcionario);
        return FuncionarioResponseDto.from(funcionario);
    }

    public List<FuncionarioResponseDto> findAllAtivos() {
        return funcionarioRepository.findByStatusTrue()
                .stream()
                .map(FuncionarioResponseDto::from)
                .toList();
    }
}
