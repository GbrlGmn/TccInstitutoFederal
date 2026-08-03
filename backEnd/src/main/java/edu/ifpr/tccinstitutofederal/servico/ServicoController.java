package edu.ifpr.tccinstitutofederal.servico;

import edu.ifpr.tccinstitutofederal.servico.dto.ServicoPatchDto;
import edu.ifpr.tccinstitutofederal.servico.dto.ServicoRequestDto;
import edu.ifpr.tccinstitutofederal.servico.dto.ServicoResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.PackagePrivate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/servico")
@RequiredArgsConstructor
public class ServicoController {
    private final ServicoService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ServicoResponseDto> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ServicoResponseDto findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoResponseDto saveServico(@Valid @RequestBody ServicoRequestDto dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ServicoResponseDto updateServico(@Valid @RequestBody ServicoRequestDto dto, @PathVariable Long id) {
        return service.update(dto, id);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ServicoResponseDto patchServico(@Valid @RequestBody ServicoPatchDto dto, @PathVariable Long id) {
        return service.patchServico(dto, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteServico(@PathVariable Long id) {
        service.deleteById(id);
    }
}
