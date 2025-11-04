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

//Endpoint para CRUD de Filmes
const controllerFilme = require('../../controller/filme/controller_filme.js')

//Retorna ums lista de filmes
router.get('/', async function (request, response) {
    //Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)

})

//Retorna um filme filtrando pelo ID
router.get('/:id', async function (request, response) {

    let idFilme = request.params.id

    //Chama a função da controller para retornar o filme do id escolhido
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code)
    response.json(filme)

})

    //Insere um novo filme no BD
router.post('/', async function (request, response) {
    //Recebe o objeto JSON pelo o body da requisição
    let dadosBody = request.body

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

    //Atualiza um filme no BD
router.put('/:id', async function (request, response) {

    //Recebe os dados do body
    let dadosBody = request.body
    
    //Receba o id do filme encaminahdo pela URL
    let idFilme = request.params.id

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para dados o filme, enviamos os dados do body e parametros e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)



})

    //Deleta um filme no BD
router.delete('/:id', async function (request, response) {
   
    //Receba o id do filme encaminahdo pela URL
    let idFilme = request.params.id

    //Chama a função da controller para dados o filme, enviamos os dados do body e parametros e o content-type
    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)

})

module.exports = router