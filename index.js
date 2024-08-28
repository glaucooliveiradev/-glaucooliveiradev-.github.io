// Importa o módulo 'express'
const express = require('express');

// Cria uma aplicação Express
const app = express();

// Define a porta do servidor
const port = 3000;

// Define uma rota
app.get('/calculadora', (req, res) => {
    // Obtém os parâmetros da query string
    const operacao = req.query.operacao;
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    // Verifica se os parâmetros são válidos
    if (!operacao || isNaN(n1) || isNaN(n2)) {
        return res.status(400).send('Bad request: parâmetros inválidos.');
    }

    let resultado;
    // Realiza a operação com base na 'operacao'
    switch (operacao) {
        case 'soma':
            resultado = n1 + n2;
            break;
        case 'subtracao':
            resultado = n1 - n2;
            break;
        case 'multiplicacao':
            resultado = n1 * n2;
            break;
        case 'divisao':
            // Verifica se o divisor é zero
            if (n2 === 0) {
                return res.status(400).send('Bad request: divisão por zero.');
            }
            resultado = n1 / n2;
            break;
        default:
            // Retorna um erro se a operação for inválida
            return res.status(400).send('Bad request: operação inválida.');
    }

    // Envia o resultado da operação como resposta
    res.send(`Resultado: ${resultado}`);
});

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/calculadora?operacao=soma&n1=2&n2=3`);
});
