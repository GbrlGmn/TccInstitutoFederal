package edu.ifpr.tccinstitutofederal.servico;

import edu.ifpr.tccinstitutofederal.ordemServico.ItemOrdemServico;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
@Table (name = "servico")
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String descricao;

    @OneToMany (mappedBy = "servico")
    private List<ItemOrdemServico> itensOrdemServico;

}
