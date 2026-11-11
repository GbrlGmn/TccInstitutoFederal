package edu.ifpr.tccinstitutofederal.recibo;

import edu.ifpr.tccinstitutofederal.recibo.dto.ReciboRequestDto;
import edu.ifpr.tccinstitutofederal.recibo.dto.ReciboResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/recibo")
@RequiredArgsConstructor
public class ReciboController {
    private final ReciboService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReciboResponseDto registrar(@Valid @RequestBody ReciboRequestDto dto) {
        return service.registrar(dto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ReciboResponseDto findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/ordem-servico/{ordemServicoId}")
    @ResponseStatus(HttpStatus.OK)
    public List<ReciboResponseDto> findByOrdemServico(@PathVariable Long ordemServicoId) {
        return service.findByOrdemServico(ordemServicoId);
    }
}
