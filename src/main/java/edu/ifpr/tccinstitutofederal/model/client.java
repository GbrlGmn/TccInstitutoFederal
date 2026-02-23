package edu.ifpr.tccinstitutofederal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private byte RG;
    private byte CPF;
    private byte telefone;
    private String email;
    private String localTrabalho;
    private String endereco;
    private String cidade;
    private String uf;
    private String cep;
    private byte nCasa;
    private boolean Status;
}
