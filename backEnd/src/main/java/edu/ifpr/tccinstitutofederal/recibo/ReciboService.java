package edu.ifpr.tccinstitutofederal.recibo;

import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico;
import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico.StatusOrder;
import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServicoRepository;
import edu.ifpr.tccinstitutofederal.recibo.dto.ReciboRequestDto;
import edu.ifpr.tccinstitutofederal.recibo.dto.ReciboResponseDto;
import edu.ifpr.tccinstitutofederal.shared.exception.RecursoNaoEncontradoException;
import edu.ifpr.tccinstitutofederal.shared.exception.RegraDeNegocioException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReciboService {
    private final ReciboRepository reciboRepository;
    private final OrdemServicoRepository ordemServicoRepository;

    @Transactional
    public ReciboResponseDto registrar(ReciboRequestDto dto) {
        OrdemServico os = ordemServicoRepository.findById(dto.getOrdemServicoId())
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Ordem de serviço não encontrada: id " + dto.getOrdemServicoId()));

        if (os.getStatus() == StatusOrder.CANCELADA) {
            throw new RegraDeNegocioException("OS cancelada não aceita novos pagamentos.");
        }

        BigDecimal valor = dto.getValorPago().setScale(2, RoundingMode.HALF_UP);
        BigDecimal pendente = os.getValorPendente();
        if (valor.compareTo(pendente) > 0) {
            throw new RegraDeNegocioException(
                    "Pagamento maior que o saldo pendente da OS (R$ " + pendente + ").");
        }

        Recibo recibo = Recibo.builder()
                .valorPago(valor)
                .formaPagamento(dto.getFormaPagamento())
                .dataPagamento(dto.getDataPagamento() != null ? dto.getDataPagamento() : LocalDate.now())
                .observacao(dto.getObservacao())
                .build();

        os.adicionarPagamento(recibo);
        return ReciboResponseDto.from(reciboRepository.save(recibo));
    }

    @Transactional(readOnly = true)
    public ReciboResponseDto findById(Long id) {
        Recibo recibo = reciboRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Recibo não encontrado: id " + id));
        return ReciboResponseDto.from(recibo);
    }

    @Transactional(readOnly = true)
    public List<ReciboResponseDto> findByOrdemServico(Long ordemServicoId) {
        if (!ordemServicoRepository.existsById(ordemServicoId)) {
            throw new RecursoNaoEncontradoException(
                    "Ordem de serviço não encontrada: id " + ordemServicoId);
        }
        return reciboRepository.findByOrdemServicoIdOrderByDataPagamentoAsc(ordemServicoId)
                .stream()
                .map(ReciboResponseDto::from)
                .toList();
    }
}
