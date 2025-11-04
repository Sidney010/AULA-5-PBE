
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

//Endpoint para CRUD de Gênero
const controllerGenero = require('../../controller/genero/controller_genero.js')

//Retorna ums lista de Gênero
router.get('/', async function (request, response) {
    //Chama a função da controller para retornar todos os gêneros
    let genero = await controllerGenero.listarGeneros()
    response.status(genero.status_code)
    response.json(genero)

})

//Retorna um gênero filtrando pelo ID
router.get('/:id', async function (request, response) {

    let idGenero = request.params.id

    //Chama a função da controller para retornar o genero do id escolhido
    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)

})

    //Insere um novo gênero no BD
router.post('/', async function (request, response) {
    //Recebe o objeto JSON pelo o body da requisição
    let dadosBody = request.body

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir o genero, enviamos os dados do body e o content-type
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

    //Atualiza um gênero no BD
router.put('/:id', async function (request, response) {

    //Recebe os dados do body
    let dadosBody = request.body
    
    //Receba o id do genero encaminahdo pela URL
    let idGenero = request.params.id

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para dados o gênero, enviamos os dados do body e parametros e o content-type
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)



})

    //Deleta um gênero no BD
router.delete('/:id', async function (request, response) {
   
    //Receba o id do gênero encaminahdo pela URL
    let idGenero = request.params.id

    //Chama a função da controller para dados o Gênero, enviamos os dados do body e parametros e o content-type
    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)

})

module.exports = router