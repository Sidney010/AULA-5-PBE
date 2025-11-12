/***********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requesições do projeto
 * Data: 04/11/2025
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

app.listen(PORT, function () {
    console.log('API aguardando requisições !!!')
})
/****************************************************************  */
//                           Import ROUTES
//Importar o arquivo das rotas de filmes
const filmesRoutes = require('./routes/filme/routes_filme.js')

//Importar o arquivo das rotas de estudio
const estudioRoutes = require('./routes/estudio/routes_estudio.js')

//Importar o arquivo das rotas de gênero
const generoRoutes = require('./routes/genero/routes_genero.js')

//Importar o arquivo das rotas da classificação etária
const classificacaoEtariaRoutes = require('./routes/classificacao_etaria/routes_classificacao_etaria.js')

//Importar o arquivo das rotas da nacionalidade
const nacionalidadeRoutes = require('./routes/nacionalidade/routes_nacionalidade.js')

//Importar o arquivo das rotas da ator
const atorRoutes = require('./routes/ator/routes_ator.js')

//************************************************************************************** */
//                           Configuração     ROUTES
//Configurando as rotas de filmes
app.use('/v1/locadora/filme', cors(), bodyParserJSON, filmesRoutes)

//Configurando as rotas de cliente
app.use('/v1/locadora/estudio', cors(), bodyParserJSON, estudioRoutes)

//Configurando as rotas de genero
app.use('/v1/locadora/genero', cors(), bodyParserJSON, generoRoutes)

//Configurando as rotas de classificação etária
app.use('/v1/locadora/classificacaoEtaria', cors(), bodyParserJSON, classificacaoEtariaRoutes)

//Configurando as rotas de nacionalidade
app.use('/v1/locadora/nacionalidade', cors(), bodyParserJSON, nacionalidadeRoutes)

//Configurando as rotas de atores
app.use('/v1/locadora/ator', cors(), bodyParserJSON, atorRoutes)

