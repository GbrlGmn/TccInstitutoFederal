package edu.ifpr.tccinstitutofederal.cliente;

import edu.ifpr.tccinstitutofederal.cliente.dto.ClientePatchDto;
import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteRequestDto;


import java.util.List;

@RestController
@RequestMapping("v1/cliente")
@RequiredArgsConstructor
public class ClienteController {
    private final ClienteService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ClienteResponseDto> findAll() {
        return service.findAll();
    }



    @GetMapping("/ativos")
    public ResponseEntity<List<ClienteResponseDto>> findAllAtivos(
            @RequestParam(required = false) Boolean ativo) {
        return ResponseEntity.ok(service.findAllAtivos());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveCliente(@Valid @RequestBody ClienteRequestDto dto) {
        service.save(dto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ClienteResponseDto findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCliente(@PathVariable Long id) {
        service.deleteById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ClienteResponseDto updateCliente(@Valid @RequestBody ClienteRequestDto dto, @PathVariable Long id) {
        return service.update(dto, id);
    }
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ClienteResponseDto patchCliente(
            @RequestBody ClientePatchDto patchDto,
            @PathVariable Long id) {

        return service.patch(patchDto, id);
    }

    @PutMapping("reativar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ClienteResponseDto reactivateCliente(@PathVariable Long id) {

        return service.reactivateCliente(id);
    }
}
