var express = require('express');
var router = express.Router();


let pessoas_e_emails_cadastrados = [];


function adicionarCadastroValidandoRespondendo(nome, email) {
    if (nome != '' && email != '') {
        pessoas_e_emails_cadastrados.push({ nome, email });

        return { cadastroEfetuado: true, msg: "Cadastro realizado com suecesso!" };
    }

    return { cadastroEfetuado: false, msg: "O preenchimento dos campos é obrigatório!" };
}


function alterarCadastroValidandoRespondendo(nome, email, emailAnterior) {
    if (nome != '' && email != '') {
        pessoas_e_emails_cadastrados = pessoas_e_emails_cadastrados.map((cadastro) => {
            if (cadastro.email == emailAnterior) {
                return { nome, email }
            }

            return cadastro;
        });

        return { cadastroEfetuado: true, msg: "Alteração realizada com suecesso!" };
    }

    return { cadastroEfetuado: false, msg: "O preenchimento dos campos é obrigatório!" };
}


function removerCadastro(email) {
    pessoas_e_emails_cadastrados = pessoas_e_emails_cadastrados.filter(cadastro => cadastro.email != email);
}


router.get('/', (request, response, next) => {
    response.render('index', { title: 'Express EJS CRUD', pessoas_e_emails_cadastrados });
});


router.post('/', (request, response, next) => {
    const respostaCadastro = adicionarCadastroValidandoRespondendo(request.body.form_nome, request.body.form_email);

    if (respostaCadastro.cadastroEfetuado == true) {
        response.render('index', { title: 'Express EJS CRUD', pessoas_e_emails_cadastrados, respostaCadastro });
    } else {
        response.render('cadastro', { respostaCadastro });
    }
});


router.get('/alterar/:email', (request, response, next) => {
    const cadastro = pessoas_e_emails_cadastrados.find(cadastro => cadastro.email == request.params.email);

    response.render('alterar', { cadastro });
});


router.delete('/', (request, response, next) => {
    removerCadastro(request.body.email);

    response.status(200).end();
});


router.get('/cadastro', (request, response, next) => {
    response.render('cadastro');
});


router.put('/', (request, response, next) => {
    const respostaAlteracao = alterarCadastroValidandoRespondendo(request.body.nome, request.body.email, request.body.emailAnterior);

    response.status(200).end();
});


module.exports = router;
