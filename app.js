/***********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requesições do projeto
 * Data: 07/10/2025
 * Autor: Sidney
 * Versão 1.0
 *********************************************************************************************************************************/

// Import das dependências
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um obejto especilista no formato JSON para receber os dados do body (POST e PUT)
const bodyParserJSON = bodyParser.json()

//Porta
const PORT = process.PORT || 8080

// Instância na class do express
const app = express()

// Configurações do CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')      // IP de origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')   // Metodos (Verbos) do protocolo HTTP

    app.use(cors())
    next()                                                  //Próximo, ler tudo
})

//************************************************************************************** */
//Endpoint para CRUD de Filmes
const controllerFilme = require('./controller/filme/controller_filme.js')

//Retorna ums lista de filmes
app.get('/v1/locadora/filmes', cors(), async function (request, response) {
    //Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)

})

//Retorna um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {

    let idFilme = request.params.id

    //Chama a função da controller para retornar o filme do id escolhido
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code)
    response.json(filme)

})

    //Insere um novo filme no BD
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {
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
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {

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
app.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {
   
    //Receba o id do filme encaminahdo pela URL
    let idFilme = request.params.id

    //Chama a função da controller para dados o filme, enviamos os dados do body e parametros e o content-type
    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)

})
//************************************************************************************** */
//Endpoint para CRUD de Gênero
const controllerGenero = require('./controller/genero/controller_genero.js')

//Retorna ums lista de Gênero
app.get('/v1/locadora/generos', cors(), async function (request, response) {
    //Chama a função da controller para retornar todos os gêneros
    let genero = await controllerGenero.listarGeneros()
    response.status(genero.status_code)
    response.json(genero)

})

//Retorna um gênero filtrando pelo ID
app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {

    let idGenero = request.params.id

    //Chama a função da controller para retornar o genero do id escolhido
    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)

})

    //Insere um novo gênero no BD
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function (request, response) {
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
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function (request, response) {

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
app.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {
   
    //Receba o id do gênero encaminahdo pela URL
    let idGenero = request.params.id

    //Chama a função da controller para dados o Gênero, enviamos os dados do body e parametros e o content-type
    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)

})
//************************************************************************************** */
//Endpoint para CRUD de Classificação Etária
const controllerClassificacaoEtaria = require('./controller/classificacao_etaria/controller_classificacao_etaria.js')

//Retorna ums lista de Classificação Etária
app.get('/v1/locadora/classificacaoEtarias', cors(), async function (request, response) {
    //Chama a função da controller para retornar todos as classsifcação etária
    let classificacaoEtaria = await controllerClassificacaoEtaria.listarClassificacoesEtarias()
    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)

})

//Retorna uma Classificação Etária filtrando pelo ID
app.get('/v1/locadora/classificacaoEtaria/:id', cors(), async function (request, response) {

    let idClassificacaoEtaria = request.params.id

    //Chama a função da controller para retornar a classificação Etaria do id escolhido
    let classificacaoEtaria = await controllerGenero.buscarGeneroId(idClassificacaoEtaria)

    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)

})

    //Insere uma nova Classificação Etária no BD
app.post('/v1/locadora/classificacaoEtaria', cors(), bodyParserJSON, async function (request, response) {
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
app.put('/v1/locadora/classificacaoEtaria/:id', cors(), bodyParserJSON, async function (request, response) {

    //Recebe os dados do body
    let dadosBody = request.body
    
    //Receba o id do genero encaminahdo pela URL
    let idGenero = request.params.id

    //Recebe o content tye da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para dados da Classificação Etaria, enviamos os dados do body e parametros e o content-type
    let classificacaoEtaria = await controllerClassificacaoEtaria.atualizarClassificacaoEtaria(dadosBody, idGenero, contentType)

    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)
})

    //Deleta uma Classificação Etária no BD
app.delete('/v1/locadora/classificacaoEtaria/:id', cors(), async function (request, response) {
   
    //Receba o id da classifição Etaria encaminahdo pela URL
    let idClassificacaoEtaria = request.params.id

    //Chama a função da controller para dados o Classificação Etaria, enviamos os dados do body e parametros e o content-type
    let classificacaoEtaria = await controllerClassificacaoEtaria.excluirClassificacaoEtaria(idClassificacaoEtaria)

    response.status(classificacaoEtaria.status_code)
    response.json(classificacaoEtaria)
})
//************************************************************************************** */

app.listen(PORT, function () {
    console.log('API aguardando requisições !!!')
})
