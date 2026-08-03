package edu.ifpr.tccinstitutofederal.cliente;

import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteRequestDto;
import edu.ifpr.tccinstitutofederal.cliente.dto.ClientePatchDto;
import edu.ifpr.tccinstitutofederal.cliente.dto.ClienteResponseDto;
import edu.ifpr.tccinstitutofederal.funcionario.dto.FuncionarioResponseDto;
import edu.ifpr.tccinstitutofederal.shared.exception.RegraDeNegocioException;
import edu.ifpr.tccinstitutofederal.shared.exception.RecursoNaoEncontradoException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public List<ClienteResponseDto> findAll() {
        return clienteRepository.findAll()
                .stream()
                .map(ClienteResponseDto::from)
                .toList();
    }

    public ClienteResponseDto findById(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado: id " + id));
        return ClienteResponseDto.from(cliente);
    }

    @Transactional
    public ClienteResponseDto save(ClienteRequestDto dto) {
        if (!validarCpf(dto.getCpf())) {
            throw new IllegalArgumentException("CPF inválido.");

        }
        Cliente cliente = Cliente.builder()
                .nome(dto.getNome())
                .cpf(dto.getCpf())
                .telefone(dto.getTelefone())
                .email(dto.getEmail())
                .localTrabalho(dto.getLocalTrabalho())
                .endereco(dto.getEndereco())
                .cidade(dto.getCidade())
                .uf(dto.getUf())
                .cep(dto.getCep())
                .ncasa(dto.getNCasa())
                .status(dto.isStatus())
                .build();
        clienteRepository.save(cliente);

        return ClienteResponseDto.from(cliente);

    }

    @Transactional
    public ClienteResponseDto deleteById(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente nao encontrado: id " + id));
        if (cliente.isStatus()) {
            cliente.setStatus(false);
        }else {
            System.out.println("cliente nao encontrado");
        }
        Cliente atualizado = clienteRepository.save(cliente);
        return ClienteResponseDto.from(cliente);
    }

    @Transactional
    public ClienteResponseDto reactivateCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente nao encontrado"));
        if (!cliente.isStatus()) {
            cliente.setStatus(true);
        }else  {
            System.out.println("cliente nao encontrado");
        }
      Cliente atualizado = clienteRepository.save(cliente);
        return ClienteResponseDto.from(atualizado);
    }

    @Transactional
    public ClienteResponseDto update(ClienteRequestDto dto, Long id) {

        if (!validarCpf(dto.getCpf())) {
            throw new RegraDeNegocioException("CPF inválido.");
        }

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado: id " + id));

        cliente.setNome(dto.getNome());
        cliente.setCpf(dto.getCpf());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEmail(dto.getEmail());
        cliente.setLocalTrabalho(dto.getLocalTrabalho());
        cliente.setEndereco(dto.getEndereco());
        cliente.setCidade(dto.getCidade());
        cliente.setUf(dto.getUf());
        cliente.setCep(dto.getCep());
        cliente.setNcasa(dto.getNCasa());
        cliente.setStatus(dto.isStatus());

        Cliente atualizado = clienteRepository.save(cliente);

        return ClienteResponseDto.from(atualizado);
    }

    @Transactional
    public ClienteResponseDto patch(ClientePatchDto patchDto, Long id) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado: id " + id));

        if (patchDto.getNome() != null) {
            cliente.setNome(patchDto.getNome());
        }

        if (patchDto.getTelefone() != null) {
            cliente.setTelefone(patchDto.getTelefone());
        }

        if (patchDto.getEmail() != null) {
            cliente.setEmail(patchDto.getEmail());
        }

        if (patchDto.getEndereco() != null) {
            cliente.setEndereco(patchDto.getEndereco());
        }

        if (patchDto.getCidade() != null) {
            cliente.setCidade(patchDto.getCidade());
        }

        if (patchDto.getUf() != null) {
            cliente.setUf(patchDto.getUf());
        }

        if (patchDto.getCep() != null) {
            cliente.setCep(patchDto.getCep());
        }

        if (patchDto.getNcasa() != null) {
            cliente.setNcasa(patchDto.getNcasa());
        }

        if (patchDto.getStatus() != null) {
            cliente.setStatus(patchDto.getStatus());
        }

        Cliente atualizado = clienteRepository.save(cliente);

        return ClienteResponseDto.from(atualizado);
    }

    public List<ClienteResponseDto> findAllAtivos() {
        return clienteRepository.findByStatusTrue()
                .stream()
                .map(ClienteResponseDto::from)
                .toList();
    }

    private boolean validarCpf(String cpf) {
        if (cpf == null) {
            return false;
        }

        // Remove pontos, traços e outros caracteres
        cpf = cpf.replaceAll("\\D", "");

        // Deve possuir 11 dígitos
        if (cpf.length() != 11) {
            return false;
        }

        // Rejeita CPFs com todos os dígitos iguais
        if (cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        int soma = 0;

        // Cálculo do primeiro dígito verificador
        for (int i = 0; i < 9; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
        }

        int resto = soma % 11;
        int primeiroDigito = (resto < 2) ? 0 : 11 - resto;

        if (primeiroDigito != Character.getNumericValue(cpf.charAt(9))) {
            return false;
        }

        soma = 0;

        // Cálculo do segundo dígito verificador
        for (int i = 0; i < 10; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
        }

        resto = soma % 11;
        int segundoDigito = (resto < 2) ? 0 : 11 - resto;

        return segundoDigito == Character.getNumericValue(cpf.charAt(10));
    }

}
