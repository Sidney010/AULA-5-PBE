/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model da Genero
 *               (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 03/11/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const generoDAO = require('../../model/DAO/genero.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna a lista dos gêneros
const listarGenero = async function () {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retorna a lista de gêneros
        let result = await generoDAO.getSelectAllGenres()
        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.genres = result

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
//Retorna um gênero filtrando pelo ID
const buscarGeneroId = async function (id) {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            let result = await generoDAO.getSelectByIdGenres(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.genre = result

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
//Insere um novo gênero
const inserirGenero = async function (genero, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosGenero(genero)
            if (!validarDados) {
                //Chama a função do DAO para insirir um novo gênero
                let result = await generoDAO.setInsertGenres(genero)

                if (result) {

                    //Chama a função para recebero ID gerado no banco de dados
                    let lastIdGenre = await generoDAO.getSelectLastIdGenre()

                    if (lastIdGenre) {
                        //Adiciona no JSON de Gênero o ID que foi gerado pelo BD
                        genero.id                   =   lastIdGenre
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   genero

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
//Atualiza um gênero filtrando pelo ID
const atualizarGenero = async function (genero, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {

        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosGenero(genero)
            if (!validarDados) {

                //CHama a função para validar a consistencia de ID e verificar se existe no BD
                let validarID = await buscarGeneroId(id)

                //Verifica se o ID existe no BD, caso exista teremos o status 200
                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados da gênero
                    genero.id = parseInt(id)

                    //Chama a função do DAO para atualizar um gênero
                    let result = await generoDAO.setUpdateGenres(genero)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = genero

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID //Retrono da função de buscarGeneroID (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados o Genero // 400-
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
//Apaga um gênero filtrando pelo ID
const excluirGenero = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //CHama a função para validar a consistencia de ID e verificar se existe no BD
        let validarID = await buscarGeneroId(id)

        //Verifica se o ID existe no BD, caso exista teremos o status 200
        if (validarID.status_code == 200) {

            //Chama a função do DAO para atualizar uma Gênero
            let result = await generoDAO.setDeleteGenres(parseInt(id))

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
            return validarID //Retrono da função de buscarGeneroID (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
module.exports = {
    listarGenero,
    buscarGeneroId,
    inserirGenero,
    atualizarGenero,
    excluirGenero

}

//Validação dos dados de cadastros do Gênero
const validarDadosGenero = async function (genero) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (genero.descricao == '' || genero.descricao == null || genero.descricao == undefined ) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DESCRIÇÃO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else {
        return false
    }

}