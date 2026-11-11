package edu.ifpr.tccinstitutofederal.ordemServico;

import edu.ifpr.tccinstitutofederal.itemOrdem.ItemOrdemServicoService;
import edu.ifpr.tccinstitutofederal.itemOrdem.dto.ItemOrdemServicoRequestDto;
import edu.ifpr.tccinstitutofederal.ordemServico.dto.OrdemServicoRequestDto;
import edu.ifpr.tccinstitutofederal.ordemServico.dto.OrdemServicoResponseDto;
import edu.ifpr.tccinstitutofederal.ordemServico.dto.OrdemServicoStatusDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/ordem-servico")
@RequiredArgsConstructor
public class OrdemServicoController {

    private final OrdemServicoService service;
    private final ItemOrdemServicoService itemService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OrdemServicoResponseDto> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrdemServicoResponseDto findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrdemServicoResponseDto saveOrdemServico(@Valid @RequestBody OrdemServicoRequestDto dto) {
        return service.save(dto);
    }

    @PatchMapping("/{id}/status")
    @ResponseStatus(HttpStatus.OK)
    public OrdemServicoResponseDto mudarStatus(@PathVariable Long id,
                                               @Valid @RequestBody OrdemServicoStatusDto dto) {
        return service.mudarStatus(id, dto);
    }

    @PostMapping("/{id}/itens")
    @ResponseStatus(HttpStatus.CREATED)
    public void adicionarItem(@PathVariable Long id,
                              @Valid @RequestBody ItemOrdemServicoRequestDto dto) {
        itemService.adicionarItem(id, dto);
    }

    @DeleteMapping("/{id}/itens/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerItem(@PathVariable Long id, @PathVariable Long itemId) {
        itemService.removerItem(id, itemId);
    }
}
