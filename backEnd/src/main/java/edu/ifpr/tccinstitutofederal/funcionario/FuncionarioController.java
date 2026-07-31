package edu.ifpr.tccinstitutofederal.funcionario;

import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioRequestDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public void findById(@RequestParam(value = "id") Long id){
        service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveFuncionario(@RequestBody FuncionarioRequestDto dto){
        service.save(dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFuncionario(@PathVariable Long id){
        service.deleteById(id);
    }



}

