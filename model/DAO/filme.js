/*********************************************************************************************************************
 * Objetivo: Arquivo responsávelpela realização do CRUDde filme no Banco de Dados MySQL
 * Data: 01/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

/*
 * Dependencias do node para Banco de Dados Relacional
 *      Sequelize   -> Foi uma biblioteca para acesso a banco de dados
 *      Prisma      -> É uma biblioteca atual para acesso e manipulação de dados, utilizando
 *                          SQL ou ORM (Mysql, PostgreSQlL, SQLServer, Oracle)
 *      Knex        -> É uma biblioteca atual para acesso e manipulação de dados, utilizando
 *                          SQL (MySQL)
 * 
 * Dependencia do node para banco de ados NÃO Relacional
 *      Mongoose    -> É uma biblioteca para acesso a banco de dados não relacional (MongoDB)
 * 
 * 
 * Instalação do Prisma
 * npm install prisma --save                -> Realiza a conexão com o BD
 * npm install @prisma/client -- save       -> Permite executar scripts SQL no BD
 
 
    $queryRawUnsafe()     -> Permite executar apenas sripts SQL que retornam
        dados do BD (SELECT), permite também executar um script SQL através
        de uma variável

    $executeRawUnsafe()   -> Permite executar scripts SQL que NÃO retornam dados 
        do BD (INSERT, UPDATE, DELETE)

    $queryRaw()           -> Permite executar apenas sripts SQL que retornam
        dados do BD (SELECT), permite também executar um script SQL direto
        no método.  Permite também aplicar seguranção contra SQL Inhection

    $executeRaw()         -> Permite executar scripts SQL que NÃO retornam dados 
        do BD (INSERT, UPDATE, DELETE)
        Permite também aplicar seguranção contra SQL Inhection
 */

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os filmes do banco de dados
const getSelectAllFilms = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_filme order by id desc`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }

}

//Retorna um filme filtrando pelo ID do banco de dados
const getSelectByIdFilms = async function (id) {

}

//Insere um filme no banco de dados
const setInsertFilms = async function (filme) {

}

//Atualiza um filme existente no banco de dados filtrando pelo ID
const setUpdateFilms = async function (filme) {

}

//Apaga um filme existente no banco de dados filtrando pelo ID
const setDeleteFilms = async function (id) {

}

module.exports = {
    getSelectAllFilms
}