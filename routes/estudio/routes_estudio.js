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

//Endpoint para CRUD de Estudio
const controllerEstudio = require('../../controller/estudio/controller_estudio.js')

//Retorna ums lista de Estudios
router.get('/', async function (request, response) {
    //Chama a função da controller para retornar todos os estudios
    let estudio = await controllerEstudio.listarEstudios()
    
    response.status(estudio.status_code)
    response.json(estudio)

})

//Retorna um Estudio filtrando pelo ID
router.get('/:id', async function (request, response) {

    let idEstudio = request.params.id

    //Chama a função da controller para retornar o Estudio do id escolhido
    let estudio = await controllerEstudio.buscarEstudioId(idEstudio)

    response.status(estudio.status_code)
    response.json(estudio)

})

    //Insere um novo Estudio no BD
router.post('/', async function (request, response) {
    //Recebe o objeto JSON pelo o body da requisição
    let dadosBody = request.body

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir um estudio, enviamos os dados do body e o content-type
    let estudio = await controllerEstudio.inserirEstudio(dadosBody, contentType)

    response.status(estudio.status_code)
    response.json(estudio)

})

    //Atualiza um Estudio no BD
router.put('/:id', async function (request, response) {

    //Recebe os dados do body
    let dadosBody = request.body
    
    //Receba o id do estudio encaminahdo pela URL
    let idEstudio = request.params.id

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para dados do estudio, enviamos os dados do body e parametros e o content-type
    let estudio = await controllerEstudio.atualizarEstudio(dadosBody, idEstudio, contentType)

    response.status(estudio.status_code)
    response.json(estudio)

})

    //Deleta um Estudio no BD
router.delete('/:id', async function (request, response) {
   
    //Receba o id do estudio encaminahdo pela URL
    let idEstudio = request.params.id

    //Chama a função da controller para dados do estudio, enviamos os dados do body e parametros e o content-type
    let estudio = await controllerEstudio.excluirEstudio(idEstudio)

    response.status(estudio.status_code)
    response.json(estudio)

})

module.exports = router