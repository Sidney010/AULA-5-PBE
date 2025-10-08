/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela padronização de todas as mensages da API do projeto de Filmes 
 * 
 * Data: 07/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

const dataAtual = new Date()

/***************************************** MENSAGENS DE PADRONIZAÇÃO DO PROJETO ************************************ */
const HEADER = {
    Development: 'Sidney Campos Aragão',
    API_descrepition: 'API para manipular dados da locadora de fimes',
    Version: '1.0.10.25',
    Request_date: dataAtual.toLocaleString(),
    status: Boolean,
    status_code: Number,
    response: {},

}

/***************************************** MENSAGENS DE ERRO DO PROJETO ************************************ */
const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados de retorno!!!'
}
const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição, devido a problemas na camada de MODELAGEM de dados !!!'
}
const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição, devido a problemas na camada de modelagem de CONTROLLER !!!'
}
const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição, devido a campos obrigatórios que não foram enviados corretamente, conforme a documentação da API'
}

/***************************************** MENSAGENS DE SUCESSO DO PROJETO ************************************ */
const SUCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requesição bem sucedida!!!',
}

module.exports = {
    HEADER,
    SUCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS
}