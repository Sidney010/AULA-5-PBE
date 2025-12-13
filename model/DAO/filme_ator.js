/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de dados no Banco de Dados MySQL relacionamento da tabela filme e ator
 * Data: 5/11/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca do PrismaClient
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os filmes e atores de filme do banco de dados
const getSelectAllFilmsActors = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_filme_ator order by id desc;`

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
//Retorna o id do último filme e genero cadastrado
const getSelectLastID = async function () {
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select id from tbl_filme_ator order by id desc limit 1;`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }
}
//Retorna um filme e ator filtrando pelo ID do banco de dados
const getSelectByIdFilmsActors = async function (id) {
    
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_filme_ator where id=${id};`

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
//Retorna atores filtrando pelo ID do filme do banco de dados
const getSelectActorByIdFilm = async function (idFilme) {
    
    try {

        //Script SQL
        let sql = `select tbl_ator.ator_id, tbl_ator.nome
                     from tbl_filme
                        inner join tbl_filme_ator
                            on tbl_filme.filme_id = tbl_filme_ator.filme_id
                        inner join tbl_ator
                            on tbl_ator.ator_id = tbl_filme_ator.ator_id
                    where tbl_filme.filme_id=${idFilme};`

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

// //Retorna filmes filtrando pelo ID do ator do banco de dados
const getSelectFilmsByIdAtor = async function (idAtor) {
    
    try {

        //Script SQL
        let sql = `select tbl_filme.filme_id, tbl_filme.nome
                     from tbl_filme
                        inner join tbl_filme_ator
                            on tbl_filme.filme_id = tbl_filme_ator.filme_id
                        inner join tbl_ator
                            on tbl_ator.ator_id = tbl_filme_ator.ator_id
                    where tbl_ator.ator_id=${idAtor};`

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

//Insere um ator no banco de dados
const setInsertFilmsActor = async function (filmeAtor) {
    try {
        
        // Script SQL
        let sql = `INSERT INTO tbl_filme_ator (filme_id, ator_id)
        VALUES (${filmeAtor.filme_id}, ${filmeAtor.ator_id});`
        
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
//Atualiza um elemento existente no banco de dados filtrando pelo ID
const setUpdateFilmsActor = async function (filmeAtor) {
    try {
        
        // Script SQL
        let sql = `UPDATE tbl_filme_ator SET 
        filme_id              =   ${filmeAtor.filme_id},  
        ator_id             =   ${filmeAtor.ator_id},
        where  id             =   ${filmeAtor.id};`
        
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
//Apaga um elemento existente no banco de dados filtrando pelo ID
const setDeleteFilmsActor = async function (id) {
    try {
        
        // Script SQL
        let sql = `DELETE FROM tbl_filme_ator where id = ${id};`
        
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
    getSelectAllFilmsActors,
    getSelectByIdFilmsActors,
    getSelectActorByIdFilm,
    getSelectFilmsByIdAtor,
    getSelectLastID,
    setInsertFilmsActor,
    setUpdateFilmsActor,
    setDeleteFilmsActor
}