package edu.ifpr.tccinstitutofederal.cliente;

import edu.ifpr.tccinstitutofederal.ordemServico.OrdemServico;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter @Setter
@Table (name = "cliente")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    //Relacionamentos
    @OneToMany(mappedBy = "cliente")
    private List<OrdemServico> ordemServico;

    //Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //significa que o Nome nao pode ser nulo
    @Column(nullable = false)
    private String nome;

    //signicica que o CPF nao pode ser nulo e deve ser unico
    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String email;

    // precisa mesmo disso?
    private String localTrabalho;

    @Column(nullable = false)
    private String endereco;

    private String cidade;

    private String uf;

    @Column(nullable = false)
    private String cep;

    @Column(name = "n_casa", nullable = false)
    private String ncasa;

    //status vai ser ativo e desativo
    private boolean status;
}
