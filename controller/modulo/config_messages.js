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
    message: 'Não foi possível processar a requisição, devido a campos obrigatórios que não foram enviados corretamente, conforme a documentação da API !!!'
}
const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o tipo de conteúdo enviado no body não é permitido. Deve-se utilizar apenas JSON na API !!!'
}

/***************************************** MENSAGENS DE SUCESSO DO PROJETO ************************************ */
const SUCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requesição bem sucedida!!!',
}
const SUCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Requesição bem sucedida, objeto CRIADO com sucesso!!!',
}
const SUCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Requesição bem sucedida, objeto ATUALIZADO com sucesso!!!',
}
const SUCESS_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Requesição bem sucedida, objeto APAGADO com sucesso!!!',
}

module.exports = {
    HEADER,
    SUCESS_REQUEST,
    SUCESS_CREATED_ITEM,
    SUCESS_UPDATED_ITEM,
    SUCESS_DELETED_ITEM,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE
}