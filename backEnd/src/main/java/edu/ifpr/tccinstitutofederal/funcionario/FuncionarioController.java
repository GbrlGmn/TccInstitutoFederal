package edu.ifpr.tccinstitutofederal.funcionario;

import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteResponseDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioPatchDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioRequestDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/funcionario")
@RequiredArgsConstructor
public class FuncionarioController {
    private final FuncionarioService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FuncionarioResponseDto> findAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FuncionarioResponseDto findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveFuncionario(@Valid @RequestBody FuncionarioRequestDto dto){
        service.save(dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFuncionario(@PathVariable Long id){
        service.deleteById(id);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FuncionarioResponseDto updateFuncionario(@Valid @RequestBody FuncionarioPatchDto dto, @PathVariable Long id){
        return service.patch(dto, id);
    }

    @GetMapping("/ativos")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<FuncionarioResponseDto>> findFuncionariosAtivos(
            @RequestParam(required = false) Boolean ativo) {
        return ResponseEntity.ok(service.findAllAtivos());
    }

    @PutMapping("reativar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FuncionarioResponseDto reactivateFuncionario(@PathVariable Long id) {

        return service.reactiveFuncionario(id);
    }
}

