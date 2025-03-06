// Subsistemas
class VerificadorEstoque {
    verificar(produto) {
        console.log(`Verificando estoque do produto: ${produto}`);
        return true; // Simulando que sempre há estoque
    }
}
class ProcessadorPagamento {
    processar(valor) {
        console.log(`Processando pagamento de R$ ${valor}`);
        return true; // Simulando que o pagamento sempre é aprovado
    }
}
class ServicoEntrega {
    agendar(endereco) {
        console.log(`Agendando entrega para: ${endereco}`);
    }
}
class ServicoEmail {
    enviar(email, mensagem) {
        console.log(`Enviando email para ${email}: ${mensagem}`);
    }
}
class ServicoSMS {
    enviar(telefone, mensagem) {
        console.log(`Enviando SMS para ${telefone}: ${mensagem}`);
    }
}
// Facade
class SistemaPedidoFacade {
    constructor() {
        this.verificadorEstoque = new VerificadorEstoque();
        this.processadorPagamento = new ProcessadorPagamento();
        this.servicoEntrega = new ServicoEntrega();
        this.servicoEmail = new ServicoEmail();
        this.servicoSMS = new ServicoSMS();
    }
    realizarPedido(produto, valor, email, endereco, telefone) {
        // Verifica estoque
        if (!this.verificadorEstoque.verificar(produto)) {
            return false;
        }
        // Processa pagamento
        if (!this.processadorPagamento.processar(valor)) {
            return false;
        }
        // Agenda entrega
        this.servicoEntrega.agendar(endereco);
        // Envia confirmações
        this.servicoEmail.enviar(email, `Pedido confirmado! Valor total: R$ ${valor + 25}`);
        this.servicoSMS.enviar(telefone, "Seu pedido foi confirmado!");
        return true;
    }
}
// Make classes globally available
window.SistemaPedidoFacade = SistemaPedidoFacade;
//# sourceMappingURL=facade.js.map