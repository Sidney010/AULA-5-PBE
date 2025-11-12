/***********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do projeto
 * Data:  12/11/2025
 * Autor: Sidney
 * Versão 1.0
 *********************************************************************************************************************************/

// Import das dependências
const express = require('express')

// Instância na class do express
const router = express.Router();

//Endpoint para CRUD de Ator
const controllerAtor = require('../../controller/ator/controller_ator.js')

//Retorna ums lista de Ator
router.get('/', async function (request, response) {
    //Chama a função da controller para retornar todos os atores
    let ator = await controllerAtor.listarAtores()
    
    response.status(ator.status_code)
    response.json(ator)

})

//Retorna um Ator filtrando pelo ID
router.get('/:id', async function (request, response) {

    let idAtor = request.params.id

    //Chama a função da controller para retornar o Ator do id escolhido
    let ator = await controllerAtor.buscarAtorId(idAtor)

    response.status(ator.status_code)
    response.json(ator)

})

    //Insere um novo Ator no BD
router.post('/', async function (request, response) {
    //Recebe o objeto JSON pelo o body da requisição
    let dadosBody = request.body

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir um ator, enviamos os dados do body e o content-type
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

    //Atualiza um Ator no BD
router.put('/:id', async function (request, response) {

    //Recebe os dados do body
    let dadosBody = request.body
    
    //Receba o id do ator encaminahdo pela URL
    let idAtor = request.params.id

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para dados do ator, enviamos os dados do body e parametros e o content-type
    let ator = await controllerAtor(dadosBody, idAtor, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

    //Deleta um Ator no BD
router.delete('/:id', async function (request, response) {
   
    //Receba o id do ator encaminahdo pela URL
    let idAtor = request.params.id

    //Chama a função da controller para dados do ator, enviamos os dados do body e parametros e o content-type
    let ator = await controllerAtor.excluirAtor(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

module.exports = router