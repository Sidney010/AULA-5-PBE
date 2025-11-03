/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model da Nacionalidade
 *               (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 07/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna a lista as nacionalidades
const listarNacionalidade = async function () {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retorna a lista de nacionaliadades
        let result = await nacionalidadeDAO.getSelectAllNationality()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.nacionality = result

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Retorna uma nacionalidade filtrando pelo ID
const buscarNacionalidadeId = async function (id) {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            let result = await nacionalidadeDAO.getSelectByIdNationality(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.nacionality = result

                    return MESSAGE.HEADER
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido !!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}
//Insere uma nova nacionalidade
const inserirNacionalidade = async function (nacionalidade, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosNacionaliadade(nacionalidade)
            if (!validarDados) {
                //Chama a função do DAO para insirir um novo nacionalidade
                let result = await nacionalidadeDAO.setInsertNationality(nacionalidade)

                if (result) {

                    //Chama a função para recebero ID gerado no banco de dados
                    let lastIdNacionality = await nacionalidadeDAO.getSelectLastIdNationality()
                    if (lastIdNacionality) {
                        //Adiciona no JSON de nacionalidade o ID que foi gerado pelo BD
                        nacionalidade.id = lastIdNacionality
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = nacionalidade

                        return MESSAGE.HEADER //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarDados
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualiza uma nacionalidade filtrando pelo ID
const atualizarNacionalidade = async function (nacionalidade, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {

        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosNacionaliadade(nacionalidade)
            if (!validarDados) {

                //CHama a função para validar a consistencia de ID e verificar se existe no BD
                let validarID = await buscarNacionalidadeId(id)

                //Verifica se o ID existe no BD, caso exista teremos o status 200
                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados da nacionalidade
                    nacionalidade.id = parseInt(id)

                    //Chama a função do DAO para atualizar uma nacionalidade
                    let result = await nacionalidadeDAO.setUpdateNationality(nacionalidade)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = nacionalidade

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID //Retrono da função de buscarNacionalidadeID (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados o Nacionalidade // 400-
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
//Apaga uma Nacionalidade filtrando pelo ID
const excluirNacionalidade = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //CHama a função para validar a consistencia de ID e verificar se existe no BD
        let validarID = await buscarNacionalidadeId(id)

        //Verifica se o ID existe no BD, caso exista teremos o status 200
        if (validarID.status_code == 200) {

            //Chama a função do DAO para atualizar uma nacionalidade
            let result = await nacionalidadeDAO.setDeleteNationality(parseInt(id))

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message
                delete MESSAGE.HEADER.response

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return validarID //Retrono da função de buscarNacionalidadeID (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
module.exports = {
    listarNacionalidade,
    buscarNacionalidadeId,
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade
}

//Validação dos dados de cadastros do Nacionalidade
const validarDadosNacionaliadade = async function (nacionalidade) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (nacionalidade.nome == '' || nacionalidade.nome == null || nacionalidade.nome == undefined || nacionalidade.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (nacionalidade.gentilico == undefined || nacionalidade.gentilico.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [GENTÍLICO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (nacionalidade.sigla == '' || nacionalidade.sigla == null || nacionalidade.sigla == undefined || nacionalidade.sigla.length > 5) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DESCRIÇÃO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (nacionalidade.continente == undefined || nacionalidade.continente.length > 50) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CONTINENTE] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (nacionalidade.lingua_oficial == undefined || nacionalidade.lingua_oficial.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [LINGUA_OFIICIAL] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (nacionalidade.bandeira_url == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BANDDEIRA_URL] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (nacionalidade.moeda == undefined || nacionalidade.moeda.length > 50) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [MOEDA] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else {
        return false
    }

}