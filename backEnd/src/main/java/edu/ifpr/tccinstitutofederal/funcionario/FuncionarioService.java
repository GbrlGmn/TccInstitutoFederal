package edu.ifpr.tccinstitutofederal.funcionario;


import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioRequestDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioResponseDto;
import edu.ifpr.tccinstitutofederal.shared.exception.RecursoNaoEncontradoException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        funcionarioRepository.save(funcionario);
    }


    @Transactional
    public FuncionarioResponseDto deleteById(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionario nao encontrado"));
        if (funcionario.isStatus()) {
            funcionario.setStatus(false);
        }else {
//            funcionario.orElseThrow(() - > new RecursoNaoEncontradoException("Funcionario não encontrado: id " + id));
            System.out.println("erro ao tentar deletar funcionario");
        }
        Funcionario atualizado = funcionarioRepository.save(funcionario);
        return FuncionarioResponseDto.from(funcionario);

    }

//    public FuncionarioResponseDto update(FuncionarioRequestDto dto, Long id) {
//        Funcionario funcionario = funcionarioRepository.findById(id)
//                .orElseThrow(RuntimeException::new);
//        if (funcionario.getNome())
//    }
}
