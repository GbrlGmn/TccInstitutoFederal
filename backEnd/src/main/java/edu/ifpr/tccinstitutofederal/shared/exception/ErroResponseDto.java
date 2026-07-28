package edu.ifpr.tccinstitutofederal.shared.exception;

import java.time.LocalDateTime;

public record ErroResponseDto(
        LocalDateTime timestamp,
        int status,
        String erro,
        String mensagem
) {}
