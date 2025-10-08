/***********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requesições do projeto
 * Data: 07/10/2025
 * Autor: Sidney
 * Versão 1.0
 *********************************************************************************************************************************/

// Import das dependências
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Porta
const PORT          = process.PORT || 8080

// Instância na class do express
const app = express()

// Configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin','*')      // IP de origem
    response.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')   // Metodos (Verbos) do protocolo HTTP

    app.use(cors())
    next()                                                  //Próximo, ler tudo
})

const controllerFilme = require('./controller/filme/controller_filme.js')

//Endpoint para CRUD de Filmes
    //Retorna ums lista de filmes
app.get('/v1/locadora/filme', cors(), async function (request, response){
    //Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)

})

    //Retorna um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function (request, response){

    let idFilme = request.params.id
    
    //Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code)
    response.json(filme)

})

app.listen(PORT, function(){
    console.log('API aguardando requisições !!!')
})