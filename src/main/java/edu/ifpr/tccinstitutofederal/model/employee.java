package edu.ifpr.tccinstitutofederal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import javax.xml.crypto.Data;
import java.util.Date;

@Entity
@Getter @Setter
public class employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String endeco;
    private Date dataNasc;
    private byte telefone;
    private String cargo;
    private Date dataAdm;
    private Date dataDem;
    private double salario;
    private boolean status;

}
