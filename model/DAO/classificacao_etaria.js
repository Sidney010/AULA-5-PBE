/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL da tabela classificação etária
 * Data: 22/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca do PrismaClient
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos as classifcações etárias de filme do banco de dados
const getSelectAllAgeRating = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_classificacao_etaria order by classificacao_etaria_id;`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }

}
//Retorna o id da última classificação etária cadastrada
const getSelectLastIdAgeRating = async function () {
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select classificacao_etaria_id from tbl_classificacao_etaria order by classificacao_etaria_id desc limit 1;`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].classificacao_etaria_id)
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }
}
//Retorna uma classificação etária filtrando pelo ID do banco de dados
const getSelectByIdAgeRating = async function (id) {
    
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_classificacao_etaria where classificacao_etaria_id=${id};`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }

}
//Insere uma classificação etária no banco de dados
const setInsertAgeRating = async function (classificacaoEtaria) {
    try {
        
        // Script SQL
        let sql = `INSERT INTO tbl_classificacao_etaria (faixa_etaria, sigla, descricao, detalhes)
        VALUES (${classificacaoEtaria.faixa_etaria}, '${classificacaoEtaria.sigla}', '${classificacaoEtaria.descricao}', '${classificacaoEtaria.detalhes}');`
        
        // Por variavel é Unsafe
        // $executeRawUnsafe () -> Permite apenas executar scripsts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}
//Atualiza uma classificação etária existente no banco de dados filtrando pelo ID
const setUpdateAgeRating = async function (classificacaoEtaria) {
    try {
        
        // Script SQL
        let sql = `UPDATE tbl_classificacao_etaria SET 
        faixa_etaria                        =   ${classificacaoEtaria.faixa_etaria},
        sigla                               =   '${classificacaoEtaria.sigla}',  
        descricao                           =   '${classificacaoEtaria.descricao}',
        detalhes                            =   '${classificacaoEtaria.detalhes}', 
        where classificacao_etaria_id       =    ${classificacaoEtaria.id};`
        
        // Por variavel é Unsafe
        // $executeRawUnsafe () -> Permite apenas executar scripsts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}
//Apaga uma classificação etária existente no banco de dados filtrando pelo ID
const setDeleteAgeRating = async function (id) {
    try {
        
        // Script SQL
        let sql = `DELETE FROM tbl_classificacao_etaria where classificacao_etaria_id = ${id};`
        
        // Por variavel é Unsafe
        // $executeRawUnsafe () -> Permite apenas executar scripsts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllAgeRating,
    getSelectLastIdAgeRating,
    getSelectByIdAgeRating,
    setInsertAgeRating,
    setUpdateAgeRating,
    setDeleteAgeRating
}