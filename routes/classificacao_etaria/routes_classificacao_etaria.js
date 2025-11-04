/***********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do projeto
 * Data: 04/11/2025
 * Autor: Sidney
 * Versão 1.0
 *********************************************************************************************************************************/

// Import das dependências
const express = require('express')

// Instância na class do express
const router = express.Router();


//Endpoint para CRUD de Classificação Etária
const controllerClassificacaoEtaria = require('../../controller/classificacao_etaria/controller_classificacao_etaria.js')

//Retorna ums lista de Classificação Etária
router.get('/', async function (request, response) {
    //Chama a função da controller para retornar todos as classifcação etária
    let classificacaoEtaria = await controllerClassificacaoEtaria.listarClassificacoesEtarias()
    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)

})

//Retorna uma Classificação Etária filtrando pelo ID
router.get('/:id', async function (request, response) {

    let idClassificacaoEtaria = request.params.id

    //Chama a função da controller para retornar a classificação Etaria do id escolhido
    let classificacaoEtaria = await controllerClassificacaoEtaria.buscarClassificacaoEtariaId(idClassificacaoEtaria)

    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)

})

    //Insere uma nova Classificação Etária no BD
router.post('/', async function (request, response) {
    //Recebe o objeto JSON pelo o body da requisição
    let dadosBody = request.body

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir uma Classificação Etária, enviamos os dados do body e o content-type
    let classificacaoEtaria = await controllerClassificacaoEtaria.inserirClassificacaoEtaria(dadosBody, contentType)

    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)
})

    //Atualiza uma Classificação Etária no BD
router.put('/:id', async function (request, response) {

    //Recebe os dados do body
    let dadosBody = request.body
    
    //Receba o id da Classificação Etária encaminahdo pela URL
    let idClassificacaoEtaria = request.params.id

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para dados da Classificação Etaria, enviamos os dados do body e parametros e o content-type
    let classificacaoEtaria = await controllerClassificacaoEtaria.atualizarClassificacaoEtaria(dadosBody, idClassificacaoEtaria, contentType)

    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)
})

    //Deleta uma Classificação Etária no BD
router.delete('/:id', async function (request, response) {
   
    //Receba o id da classificação Etaria encaminahdo pela URL
    let idClassificacaoEtaria = request.params.id

    //Chama a função da controller para dados o Classificação Etaria, enviamos os dados do body e parametros e o content-type
    let classificacaoEtaria = await controllerClassificacaoEtaria.excluirClassificacaoEtaria(idClassificacaoEtaria)

    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)
})

module.exports = router