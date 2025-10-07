/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model 
 *               (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 07/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const filmeDAO = require('../../model/DAO/filme.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna uma lista de filmes
const listarFilmes = async function () {
    //Chama a função do DAO para retorna a lista de filmes
    let result = await filmeDAO.getSelectAllFilms()
    
    if(result){
        if(result.length > 0){
            MESSAGE_DEFAULT.MESSAGE_HEADER.status       = MESSAGE_DEFAULT.MESSAGE_SUCESS_REQUEST.status
            MESSAGE_DEFAULT.MESSAGE_HEADER.status_code  = MESSAGE_DEFAULT.MESSAGE_SUCESS_REQUEST.status_code
            MESSAGE_DEFAULT.MESSAGE_HEADER.response.films = result
            
            return MESSAGE_DEFAULT.MESSAGE_HEADER
        }
    }
}
//Retorna um filme filtrando pelo ID
const buscarFilmeId = async function (id) {
    
}
//Insere um novo filme
const insirirFilme = async function (filme) {
    
}
//Atualiza um filme filtrando pelo ID
const atualizarFilme = async function (filme, id) {
    
}
//Apaga um filme filtrando pelo ID
const excluirFilme = async function (id) {
    
}
 module.exports = {
    listarFilmes
 }