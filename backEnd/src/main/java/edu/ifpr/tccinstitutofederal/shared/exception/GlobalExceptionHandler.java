package edu.ifpr.tccinstitutofederal.shared.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ErroResponseDto> handleNaoEncontrado(RecursoNaoEncontradoException ex) {
        return montarResposta(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(RegraDeNegocioException.class)
    public ResponseEntity<ErroResponseDto> handleRegraDeNegocio(RegraDeNegocioException ex) {
        return montarResposta(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErroResponseDto> handleIntegridade(DataIntegrityViolationException ex) {
        return montarResposta(HttpStatus.CONFLICT, "Violação de integridade — verifique dados duplicados ou vínculos existentes.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResponseDto> handleValidacao(MethodArgumentNotValidException ex) {
        FieldError erro = ex.getBindingResult().getFieldError();
        String mensagem = erro != null ? erro.getField() + ": " + erro.getDefaultMessage() : "Erro de validação";
        return montarResposta(HttpStatus.BAD_REQUEST, mensagem);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResponseDto> handleGenerico(Exception ex) {
        return montarResposta(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno no servidor.");
    }

    private ResponseEntity<ErroResponseDto> montarResposta(HttpStatus status, String mensagem) {
        ErroResponseDto corpo = new ErroResponseDto(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                mensagem
        );
        return ResponseEntity.status(status).body(corpo);
    }
}
