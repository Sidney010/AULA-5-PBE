/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model da classifcação Etária
 *               (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 07/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const classificacaoEtariaDAO = require('../../model/DAO/classificacao_etaria.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna a lista das classificaçãoes etarias
const listarClassificacoesEtarias = async function () {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retorna a lista de classificações
        let result = await classificacaoEtariaDAO.getSelectAllAgeRating()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.ageRating = result

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
//Retorna uma classificação filtrando pelo ID
const buscarClassificacaoEtariaId = async function (id) {

    //Realizanodo uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            let result = await classificacaoEtariaDAO.getSelectByIdAgeRating(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.ageRating = result

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
//Insere uma nova classificações etárias
const inserirClassificacaoEtaria = async function (classificacaoEtaria, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosClassificacaoEtaria(classificacaoEtaria)
            if (!validarDados) {
                //Chama a função do DAO para insirir um nova classificação
                let result = await classificacaoEtariaDAO.setInsertAgeRating(classificacaoEtaria)

                if (result) {

                    //Chama a função para recebero ID gerado no banco de dados
                    let lastIdAgeRating = await classificacaoEtariaDAO.getSelectLastIdAgeRating()

                    if (lastIdAgeRating) {
                        //Adiciona no JSON de classificação etária o ID que foi gerado pelo BD
                        classificacaoEtaria.id     =   lastIdAgeRating
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   classificacaoEtaria

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

//Atualiza uma classificação etaria filtrando pelo ID
const atualizarClassificacaoEtaria = async function (classificacaoEtaria, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {

        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosClassificacaoEtaria(classificacaoEtaria)
            if (!validarDados) {

                //CHama a função para validar a consistencia de ID e verificar se existe no BD
                let validarID = await buscarClassificacaoEtariaId(id)

                //Verifica se o ID existe no BD, caso exista teremos o status 200
                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados da classificação
                    classificacaoEtaria.id = parseInt(id)

                    //Chama a função do DAO para atualizar uma classificação
                    let result = await classificacaoEtariaDAO.setUpdateAgeRating(classificacaoEtaria)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = classificacaoEtaria

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID //Retrono da função de buscarClassificaçãoEtáriaID (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados o Classificação Etária // 400-
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
//Apaga uma classificação etária filtrando pelo ID
const excluirClassificacaoEtaria = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //CHama a função para validar a consistencia de ID e verificar se existe no BD
        let validarID = await buscarClassificacaoEtariaId(id)

        //Verifica se o ID existe no BD, caso exista teremos o status 200
        if (validarID.status_code == 200) {

            //Chama a função do DAO para atualizar uma classificação
            let result = await classificacaoEtariaDAO.setDeleteAgeRating(parseInt(id))

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
            return validarID //Retrono da função de buscarClassificaçãoEtariaID (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
module.exports = {
    listarClassificacoesEtarias,
    buscarClassificacaoEtariaId,
    inserirClassificacaoEtaria,
    atualizarClassificacaoEtaria,
    excluirClassificacaoEtaria
}

//Validação dos dados de cadastros da Classifcação Etária
const validarDadosClassificacaoEtaria = async function (classificacaoEtaria) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (classificacaoEtaria.faixa_etaria == '' || classificacaoEtaria.faixa_etaria == null || classificacaoEtaria.faixa_etaria == undefined || typeof (classificacaoEtaria.faixa_etaria) != 'number') {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FAIXA ETÁRIA] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (classificacaoEtaria.sigla == '' || classificacaoEtaria.sigla == null || classificacaoEtaria.sigla == undefined || classificacaoEtaria.sigla.length > 5) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SIGLA] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400


    } else if (classificacaoEtaria.descricao == '' || classificacaoEtaria.descricao == null || classificacaoEtaria.descricao == undefined || classificacaoEtaria.descricao.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DESCRIÇÃO] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (classificacaoEtaria.detalhes == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DETALHES] inválido !!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    }  else {
        return false
    }

}