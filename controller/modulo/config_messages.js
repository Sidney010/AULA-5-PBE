/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela padronização de todas as mensages da API do projeto de Filmes 
 * 
 * Data: 07/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

const dataAtual = new Date()

/***************************************** MENSAGENS DE PADRONIZAÇÃO DO PROJETO ************************************ */
const MESSAGE_HEADER = { 
    Development:            'Sidney Campos Aragão', 
    API_descrepition:       'API para manipular dados da locadora de fimes', 
    Version:                '1.0.10.25',
    Request_date:           dataAtual.toLocaleString(), 
    status:                 Boolean, 
    status_code:            Number, 
    response:               {},

}

/***************************************** MENSAGENS DE ERRO DO PROJETO ************************************ */

/***************************************** MENSAGENS DE SUCESSO DO PROJETO ************************************ */
const MESSAGE_SUCESS_REQUEST = {
    status:                true,
    status_code:           200,
    message:               'Requesição bem sucedida!!!',
}

module.exports = {
    MESSAGE_HEADER,
    MESSAGE_SUCESS_REQUEST
}