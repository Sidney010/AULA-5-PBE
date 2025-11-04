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

//Endpoint para CRUD de Nacionalidade
const controllerNacionalidade = require('../../controller/nacionalidade/controller_nacionalidade.js')

//Retorna ums lista de Nacionalidade
router.get('/', async function (request, response) {
    //Chama a função da controller para retornar todos as nacionalidades
    let nacionalidade = await controllerNacionalidade.listarNacionalidades()
    
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)

})

//Retorna uma Nacionalidade filtrando pelo ID
router.get('/:id', async function (request, response) {

    let idNacionalidade = request.params.id

    //Chama a função da controller para retornar a Nacionalidade do id escolhido
    let nacionalidade = await controllerNacionalidade.buscarNacionalidadeId(idNacionalidade)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)

})

    //Insere uma nova Nacionalidade no BD
router.post('/', async function (request, response) {
    //Recebe o objeto JSON pelo o body da requisição
    let dadosBody = request.body

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir uma nacionalidade, enviamos os dados do body e o content-type
    let nacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)

})

    //Atualiza uma Nacionalidade no BD
router.put('/:id', async function (request, response) {

    //Recebe os dados do body
    let dadosBody = request.body
    
    //Receba o id da nacionalidade encaminahdo pela URL
    let idNacionalidade = request.params.id

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para dados da Nacionalidade, enviamos os dados do body e parametros e o content-type
    let nacionalidade = await controllerNacionalidade.atualizarNacionalidade(dadosBody, idNacionalidade, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)

})

    //Deleta uma Nacionalidade no BD
router.delete('/:id', async function (request, response) {
   
    //Receba o id da nacionalidade encaminahdo pela URL
    let idNacionalidade = request.params.id

    //Chama a função da controller para dados da nacionalidade, enviamos os dados do body e parametros e o content-type
    let nacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)

})

module.exports = router