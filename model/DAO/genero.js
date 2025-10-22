/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL da tabela genero
 * Data: 22/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca do PrismaClient
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os generos de filme do banco de dados
const getSelectAllGenres = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_genero order by genero_id;`

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
//Retorna o id do último genero cadastrado
const getSelectLastIdGenre = async function () {
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select genero_id from tbl_genero order by genero_id desc limit 1;`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].genero_id)
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }
}
//Retorna um genero filtrando pelo ID do banco de dados
const getSelectByIdGenres = async function (id) {
    
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_genero where genero_id=${id};`

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
//Insere um genero no banco de dados
const setInsertGenres = async function (genero) {
    try {
        
        // Script SQL
        let sql = `INSERT INTO tbl_genero (nome, descricao)
        VALUES ('${genero.nome}', '${genero.descricao}');`
        
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
//Atualiza um genero existente no banco de dados filtrando pelo ID
const setUpdateGenres = async function (genero) {
    try {
        
        // Script SQL
        let sql = `UPDATE tbl_genero SET 
        nome                  =   '${genero.nome}',  
        descricao             =   '${genero.descricao}', 
        where genero_id       =    ${genero.id};`
        
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
//Apaga um genero existente no banco de dados filtrando pelo ID
const setDeleteGenres = async function (id) {
    try {
        
        // Script SQL
        let sql = `DELETE FROM tbl_genero where genero_id = ${id};`
        
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
    getSelectAllGenres,
    getSelectByIdGenres,
    getSelectLastIdGenre,
    setInsertGenres,
    setUpdateGenres,
    setDeleteGenres
}