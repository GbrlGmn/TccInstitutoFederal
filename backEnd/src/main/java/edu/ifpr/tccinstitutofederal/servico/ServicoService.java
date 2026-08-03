package edu.ifpr.tccinstitutofederal.servico;
import edu.ifpr.tccinstitutofederal.cliente.Cliente;
import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteResponseDto;
import edu.ifpr.tccinstitutofederal.servico.dto.ServicoPatchDto;
import edu.ifpr.tccinstitutofederal.shared.exception.RecursoNaoEncontradoException;
import edu.ifpr.tccinstitutofederal.servico.dto.ServicoRequestDto;
import edu.ifpr.tccinstitutofederal.servico.dto.ServicoResponseDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicoService {
    private final ServicoRepository servicoRepository;

    public List<ServicoResponseDto> findAll() {
        return servicoRepository.findAll()
                .stream()
                .map(ServicoResponseDto::from)
                .toList();
    }

    public ServicoResponseDto findById(Long id) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Serviço não encontrado: id " + id));
        return ServicoResponseDto.from(servico);
    }

    @Transactional
    public ServicoResponseDto save(ServicoRequestDto dto) {
        Servico servico = Servico.builder()
                .nome(dto.getNome())
                .descricao(dto.getDescricao())
                .build();
        Servico salvo = servicoRepository.save(servico);
        return ServicoResponseDto.from(salvo);
    }

    @Transactional
    public ServicoResponseDto update(ServicoRequestDto dto, Long id) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Serviço não encontrado: id " + id));

        if (dto.getNome() != null) servico.setNome(dto.getNome());
        if (dto.getDescricao() != null) servico.setDescricao(dto.getDescricao());

        Servico atualizado = servicoRepository.save(servico);
        return ServicoResponseDto.from(atualizado);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!servicoRepository.existsById(id)) {
            throw new RecursoNaoEncontradoException("Serviço não encontrado: id " + id);
        }
        servicoRepository.deleteById(id);
    }

    @Transactional
    public ServicoResponseDto patchServico(ServicoPatchDto dto, Long id) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Serviço não encontrado: id " + id));

        servico.setDescricao(dto.getDescricao());
        Servico atualizado = servicoRepository.save(servico);
        return ServicoResponseDto.from(atualizado);
    }
}
