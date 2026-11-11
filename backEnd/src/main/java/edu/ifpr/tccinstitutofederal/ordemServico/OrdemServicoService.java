package edu.ifpr.tccinstitutofederal.ordemServico;

import edu.ifpr.tccinstitutofederal.cliente.Cliente;
import edu.ifpr.tccinstitutofederal.cliente.ClienteRepository;
import edu.ifpr.tccinstitutofederal.funcionario.Funcionario;
import edu.ifpr.tccinstitutofederal.funcionario.FuncionarioRepository;
import edu.ifpr.tccinstitutofederal.itemOrdem.ItemOrdemServico;
import edu.ifpr.tccinstitutofederal.itemOrdem.dto.ItemOrdemServicoRequestDto;
import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico.StatusOrder;
import edu.ifpr.tccinstitutofederal.ordemServico.dto.OrdemServicoRequestDto;
import edu.ifpr.tccinstitutofederal.ordemServico.dto.OrdemServicoResponseDto;
import edu.ifpr.tccinstitutofederal.ordemServico.dto.OrdemServicoStatusDto;
import edu.ifpr.tccinstitutofederal.servico.Servico;
import edu.ifpr.tccinstitutofederal.servico.ServicoRepository;
import edu.ifpr.tccinstitutofederal.shared.exception.RecursoNaoEncontradoException;
import edu.ifpr.tccinstitutofederal.shared.exception.RegraDeNegocioException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@Service
@RequiredArgsConstructor
public class OrdemServicoService {
    private final OrdemServicoRepository ordemServicoRepository;
    private final ClienteRepository clienteRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final ServicoRepository servicoRepository;

    @Transactional(readOnly = true)
    public List<OrdemServicoResponseDto> findAll() {
        return ordemServicoRepository.findAll()
                .stream()
                .map(OrdemServicoResponseDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrdemServicoResponseDto findById(Long id) {
        return OrdemServicoResponseDto.from(buscar(id));
    }

    @Transactional
    public OrdemServicoResponseDto save(OrdemServicoRequestDto dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Cliente não encontrado: id " + dto.getClienteId()));
        if (!cliente.isStatus()) {
            throw new RegraDeNegocioException("Cliente inativo não pode abrir ordem de serviço.");
        }
        boolean temDebito = ordemServicoRepository
                .findByClienteIdAndStatus(cliente.getId(), StatusOrder.FINALIZADA)
                .stream()
                .anyMatch(o -> o.getValorPendente().compareTo(BigDecimal.ZERO) > 0);
        if (temDebito) {
            throw new RegraDeNegocioException(
                    "Cliente com pagamento pendente em OS finalizada não pode abrir nova OS.");
        }

        OrdemServico os = new OrdemServico();
        os.setCliente(cliente);
        os.setValorOrdemServico(dto.getValorOrdemServico());
        os.setPorcentagem(dto.getPorcentagem());
        os.setStatus(StatusOrder.ORCAMENTO);
        os.setDataAbertura(LocalDate.now());

        if (dto.getFuncionarioId() != null) {
            Funcionario funcionario = funcionarioRepository.findById(dto.getFuncionarioId())
                    .orElseThrow(() -> new RecursoNaoEncontradoException(
                            "Funcionário não encontrado: id " + dto.getFuncionarioId()));
            if (!funcionario.isStatus()) {
                throw new RegraDeNegocioException("Funcionário inativo não pode ser responsável por uma OS.");
            }
            os.setFuncionario(funcionario);
        }

        Set<Long> servicosVistos = new HashSet<>();
        for (ItemOrdemServicoRequestDto itemDto : dto.getItens()) {
            if (!servicosVistos.add(itemDto.getServicoId())) {
                throw new RegraDeNegocioException(
                        "Serviço repetido na lista de itens: id " + itemDto.getServicoId());
            }
            Servico servico = servicoRepository.findById(itemDto.getServicoId())
                    .orElseThrow(() -> new RecursoNaoEncontradoException(
                            "Serviço não encontrado: id " + itemDto.getServicoId()));

            os.adicionarItem(ItemOrdemServico.builder()
                    .servico(servico)
                    .quantidade(itemDto.getQuantidade())
                    .build());
        }

        return OrdemServicoResponseDto.from(ordemServicoRepository.save(os));
    }

    @Transactional
    public OrdemServicoResponseDto mudarStatus(Long id, OrdemServicoStatusDto dto) {
        OrdemServico os = buscar(id);
        StatusOrder atual = os.getStatus();
        StatusOrder novo = dto.getStatus();

        if (!transicaoPermitida(atual, novo)) {
            throw new RegraDeNegocioException(
                    "Não é possível mudar a OS de " + atual + " para " + novo + ".");
        }

        if (novo == StatusOrder.FINALIZADA || novo == StatusOrder.CANCELADA) {
            os.setDataFechamento(LocalDate.now());
        }
        os.setStatus(novo);

        return OrdemServicoResponseDto.from(ordemServicoRepository.save(os));
    }

    private boolean transicaoPermitida(StatusOrder atual, StatusOrder novo) {
        return switch (atual) {
            case ORCAMENTO -> novo == StatusOrder.EM_ANDAMENTO || novo == StatusOrder.CANCELADA;
            case EM_ANDAMENTO -> novo == StatusOrder.FINALIZADA || novo == StatusOrder.CANCELADA;
            case FINALIZADA, CANCELADA -> false;
        };
    }

    private OrdemServico buscar(Long id) {
        return ordemServicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Ordem de serviço não encontrada: id " + id));
    }
}
