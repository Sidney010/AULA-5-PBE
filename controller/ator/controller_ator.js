/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model do Ator
 *               (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 12/11/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const atorDAO = require('../../model/DAO/ator.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna a lista de atores
const listarAtores = async function () {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retorna a lista de atores
        let result = await atorDAO.getSelectAllActor()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.actor = result

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
//Retorna um ator filtrando pelo ID
const buscarAtorId = async function (id) {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            let result = await atorDAO.getSelectByIdActor(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.actor = result

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
//Insere um novo ator
const inserirAtor = async function (ator, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosAtor(ator)
            if (!validarDados) {
                //Chama a função do DAO para insirir um novo ator
                let result = await atorDAO.setInsertActor(ator)

                if (result) {

                    //Chama a função para receber o ID gerado no banco de dados
                    let lastIdActor = await atorDAO.getSelectLastIdActor()
                    if (lastIdActor) {
                        //Adiciona no JSON de ator o ID que foi gerado pelo BD
                        ator.id = lastIdActor
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = ator

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

//Atualiza um ator filtrando pelo ID
const atualizarAtor = async function (ator, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {

        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosAtor(ator)
            if (!validarDados) {

                //CHama a função para validar a consistencia de ID e verificar se existe no BD
                let validarID = await buscarAtorId(id)

                //Verifica se o ID existe no BD, caso exista teremos o status 200
                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados da ator
                    ator.id = parseInt(id)

                    //Chama a função do DAO para atualizar um ator
                    let result = await atorDAO.setUpdateActor(ator)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = ator

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID //Retrono da função de buscarAtorID (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados o Ator // 400-
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
//Apaga um Ator filtrando pelo ID
const excluirAtor = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //CHama a função para validar a consistencia de ID e verificar se existe no BD
        let validarID = await buscarAtorId(id)

        //Verifica se o ID existe no BD, caso exista teremos o status 200
        if (validarID.status_code == 200) {

            //Chama a função do DAO para atualizar um Ator
            let result = await atorDAO.setDeleteActor(parseInt(id))

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
            return validarID //Retrono da função de buscarAtorID (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
module.exports = {
    listarAtores,
    buscarAtorId,
    inserirAtor,
    atualizarAtor,
    excluirAtor
}

//Validação dos dados de cadastros do Ator
const validarDadosAtor = async function (ator) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (ator.nome == '' || ator.nome == null || ator.nome == undefined || ator.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ator.data_nascimento == '' || ator.data_nascimento == null || ator.data_nascimento == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_NASCIMENTO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (ator.data_falecimento == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_FALECIMENTO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ator.altura == '' || ator.altura == null || ator.altura == undefined || typeof (ator.altura) != 'number') {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ALTURA] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (ator.conjuge == '' || ator.conjuge == null || ator.conjuge == undefined || ator.conjuge.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CÔNJUGE] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (ator.filhos == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FILHOS] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ator.biografia == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BIOGRAFIA] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else {
        return false
    }

}