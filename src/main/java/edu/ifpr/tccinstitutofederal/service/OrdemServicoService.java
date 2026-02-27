package edu.ifpr.tccinstitutofederal.service;

import edu.ifpr.tccinstitutofederal.model.OrdemServico;
import edu.ifpr.tccinstitutofederal.repository.OrdemServicoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Transactional
@Service
public class OrdemServicoService {
    private final OrdemServicoRepository repository;

    public OrdemServicoService(OrdemServicoRepository repository) {
        this.repository = repository;
    }

    public OrdemServico obterOrdemServicoPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordem de Serviço não encontrada"));
    }

    public OrdemServico criarOrdemServico(OrdemServico os) {
        os.setStatus(OrdemServico.StatusOrder.ORCAMENTO);
        os.setDataAbertura(LocalDate.now());
        return repository.save(os);
    }

//    public OrdemServico atualizarStatus(Long id, OrdemServico.StatusOrder novoStatus) {
//        OrdemServico os = repository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Ordem de Serviço não encontrada"));
//        os.setStatus(novoStatus);
//        return repository.save(os);
//    }


    public OrdemServico cancelarOrdemServico(Long id){
        OrdemServico os = obterOrdemServicoPorId(id);

        if (os.getStatus() == (OrdemServico.StatusOrder.FINALIZADA) ||
                os.getStatus() == OrdemServico.StatusOrder.CANCELADA){
            throw new RuntimeException("Não é possível cancelar uma OS finalizada");
        }
        os.setStatus(OrdemServico.StatusOrder.CANCELADA);
        return repository.save(os);
    }

    public OrdemServico finalizarOrdemServico(Long id){
        OrdemServico os = obterOrdemServicoPorId(id);
        if (os.getStatus() != (OrdemServico.StatusOrder.EM_ANDAMENTO)){
            throw new RuntimeException("So e possivel finalizar ordens em Andamento");
        }
        if (os.getItens().isEmpty()) {
            throw new RuntimeException("Não é possível finalizar uma OS sem itens");
        }
        os.setStatus(OrdemServico.StatusOrder.FINALIZADA);
        os.setDataFechamento(LocalDate.now());
        return repository.save(os);
    }

    public OrdemServico emAndamento(Long id){
        OrdemServico os = obterOrdemServicoPorId(id);
        if (os.getStatus() != (OrdemServico.StatusOrder.ORCAMENTO)){
            throw new RuntimeException("so e possivel colcoar em andamento ordens em orcamento");
        }
        os.setStatus(OrdemServico.StatusOrder.EM_ANDAMENTO);
        return repository.save(os);
    }
    public OrdemServico somarOrdemServico(OrdemServico os) {
        double valorTotal = os.
    }


}
