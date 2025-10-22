/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL da tabela nacionalidade
 * Data: 22/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca do PrismaClient
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos as nacionalidades de filme do banco de dados
const getSelectAllNationality = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_nacionalidade order by nacionalidade_id;`

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
//Retorna o id da última nacionalidade cadastrada
const getSelectLastIdNationality = async function () {
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select nacionalidade_id from tbl_nacionalidade order by nacionalidade_id desc limit 1;`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].nacionalidade_id)
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }
}
//Retorna uma nacionalidade filtrando pelo ID do banco de dados
const getSelectByIdNationality = async function (id) {
    
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_nacionalidade where nacionalidade_id=${id};`

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
//Insere uma nacionalidade no banco de dados
const setInsertNationality = async function (nacionalidade) {
    try {
        
        // Script SQL
        let sql = `INSERT INTO tbl_nacionalidade (nome, gentilico, sigla, continente, lingua_oficial, bandeira_url, moeda)
        VALUES ('${nacionalidade.nome}', '${nacionalidade.gentilico}', '${nacionalidade.sigla}', '${nacionalidade.continente}', '${nacionalidade.lingua_oficial}', '${nacionalidade.bandeira_url}', '${nacionalidade.moeda}');`
        
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
//Atualiza uma nacionalidade existente no banco de dados filtrando pelo ID
const setUpdateNationality = async function (nacionalidade) {
    try {
        
        // Script SQL
        let sql = `UPDATE tbl_genero SET 
        nome                  =   '${nacionalidade.nome}',  
        gentilico             =   '${nacionalidade.gentilico}', 
        sigla                 =   '${nacionalidade.sigla}',
        continente            =   '${nacionalidade.continente}',
        lingua_oficial        =   '${nacionalidade.lingua_oficial}',
        bandeira_url          =   '${nacionalidade.bandeira_url}',
        moeda                 =   '${nacionalidade.moeda}',
        where genero_id       =    ${nacionalidade.id};`
        
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
//Apaga uma nacionalidade existente no banco de dados filtrando pelo ID
const setDeleteNationality = async function (id) {
    try {
        
        // Script SQL
        let sql = `DELETE FROM tbl_nacionalidade where nacionalidade_id = ${id};`
        
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
    getSelectAllNationality,
    getSelectByIdNationality,
    getSelectLastIdNationality,
    setInsertNationality,
    setUpdateNationality,
    setDeleteNationality
}