/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model da Estudio
 *               (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 03/11/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const estudioDAO = require('../../model/DAO/estudio.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna a lista os estudios
const listarEstudios = async function () {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retorna a lista de estudios
        let result = await estudioDAO.getSelectAllStudios()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.studios = result

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

//Retorna um estudio filtrando pelo ID
const buscarEstudioId = async function (id) {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            let result = await estudioDAO.getSelectByIdStudio(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.studio = result

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

//Insere uma nova estudio
const inserirEstudio = async function (estudio, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosEstudio(estudio)
            if (!validarDados) {
                //Chama a função do DAO para insirir um novo estudio
                let result = await estudioDAO.setInsertStudio(estudio)

                if (result) {

                    //Chama a função para recebero ID gerado no banco de dados
                    let lastIdStudio = await estudioDAO.getSelectLastIdStudio()
                    if (lastIdStudio) {

                        //Adiciona no JSON de estudio o ID que foi gerado pelo BD
                        estudio.id = lastIdStudio
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = estudio

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

//Atualiza um estudio filtrando pelo ID
const atualizarEstudio = async function (estudio, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {

        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosEstudio(estudio)
            if (!validarDados) {

                //CHama a função para validar a consistencia de ID e verificar se existe no BD
                let validarID = await buscarEstudioId(id)

                //Verifica se o ID existe no BD, caso exista teremos o status 200
                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados da estudio
                    estudio.id = parseInt(id)

                    //Chama a função do DAO para atualizar um estudio
                    let result = await estudioDAO.setUpdateStudio(estudio)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = estudio

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID //Retrono da função de buscarEstudioID (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados o Estudio // 400-
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
//Apaga um estudio filtrando pelo ID
const excluirEstudio = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //CHama a função para validar a consistencia de ID e verificar se existe no BD
        let validarID = await buscarEstudioId(id)

        //Verifica se o ID existe no BD, caso exista teremos o status 200
        if (validarID.status_code == 200) {

            //Chama a função do DAO para atualizar um Estudio
            let result = await estudioDAO.setDeleteStudio(parseInt(id))

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
            return validarID //Retrono da função de buscarEstudioID (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
module.exports = {
    listarEstudios,
    buscarEstudioId
}

//Validação dos dados de cadastros do Estudio
const validarDadosEstudio = async function (estudio) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    
    if (estudio.nome_fantasia == '' || estudio.nome_fantasia == null || estudio.nome_fantasia == undefined || estudio.nome_fantasia.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME_FANTASIA] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (estudio.razao_social == '' || estudio.razao_social == null || estudio.razao_social == undefined || estudio.razao_social.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [RAZÃO_SOCIAL] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (estudio.cnpj == '' || estudio.cnpj == null || estudio.cnpj == undefined || estudio.cnpj.length > 14) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CNPJ] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (estudio.logradouro == '' || estudio.logradouro == null || estudio.logradouro == undefined || estudio.logradouro.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [LOGRADOURO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (estudio.numero == '' || estudio.numero == null || estudio.numero == undefined || estudio.numero.length > 20) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NÚMERO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (estudio.bairro == '' || estudio.bairro == null || estudio.bairro == undefined || estudio.bairro.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BANDDEIRA_URL] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (estudio.cidade == '' || estudio.cidade == null || estudio.cidade == undefined || estudio.cidade.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CIDADE] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (estudio.estado == '' || estudio.estado == null || estudio.estado == undefined || estudio.estado.length > 50) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ESTADO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (estudio.pais == '' || estudio.pais == null || estudio.pais == undefined || estudio.pais.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [PAÍS] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (estudio.cep == '' || estudio.cep == null || estudio.cep == undefined || estudio.cep.length > 9) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CEP] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (estudio.complemento == '' || estudio.complemento == null || estudio.complemento == undefined || estudio.complemento.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [COMPLEMENTO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (estudio.email_contato == undefined || estudio.cidade.length > 150) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [EMAIL_CONTATO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (estudio.telefone == undefined || estudio.cidade.length > 20) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [TELEFONE] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    
    } else if (estudio.site_oficial == undefined || estudio.site_oficial.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SITE_OFICIAL] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    
    } else {
        return false
    }

}