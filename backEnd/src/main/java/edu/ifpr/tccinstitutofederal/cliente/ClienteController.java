package edu.ifpr.tccinstitutofederal.cliente;


import edu.ifpr.tccinstitutofederal.cliente.dto.ClientePatchDto;
import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteDto;


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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveCliente(@Valid @RequestBody ClienteDto dto) {
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
    public ClienteResponseDto updateCliente(@Valid @RequestBody ClienteDto dto, @PathVariable Long id) {
        return service.update(dto, id);
    }
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ClienteResponseDto patchCliente(
            @RequestBody ClientePatchDto patchDto,
            @PathVariable Long id) {

        return service.patch(patchDto, id);
    }
}
