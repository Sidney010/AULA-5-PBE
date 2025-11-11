/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de dados no Banco de Dados MySQL relacionamento da tabela filme e genero
 * Data: 5/11/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca do PrismaClient
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os filmes e generos de filme do banco de dados
const getSelectAllFilmsGenres = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_filme_genero order by id desc;`

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
        let sql = `select id from tbl_filme_genero order by id desc limit 1;`

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
//Retorna um filme e genero filtrando pelo ID do banco de dados
const getSelectByIdFilmsGenres = async function (id) {
    
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_filme_genero where id=${id};`

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
//Retorna generos filtrando pelo ID do filme do banco de dados
const getSelectGenresByIdFilm = async function (idFilme) {
    
    try {

        //Script SQL
        let sql = `select tbl_genero.genero_id, tbl_genero.nome
                     from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.filme_id = tbl_filme_genero.filme_id
                        inner join tbl_genero
                            on tbl_genero.genero_id = tbl_filme_genero.genero_id
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

// //Retorna filmes filtrando pelo ID do genero do banco de dados
const getSelectFilmsByIdGenre = async function (idGenero) {
    
    try {

        //Script SQL
        let sql = `select tbl_filme.filme_id, tbl_filme.nome
                     from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.filme_id = tbl_filme_genero.filme_id
                        inner join tbl_genero
                            on tbl_genero.genero_id = tbl_filme_genero.genero_id
                    where tbl_genero.genero_id=${idGenero};`

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
const setInsertFilmsGenres = async function (filmeGenero) {
    try {
        
        // Script SQL
        let sql = `INSERT INTO tbl_filme_genero (filme_id, genero_id)
        VALUES (${filmeGenero.filme_id}, ${filmeGenero.genero_id});`
        
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
const setUpdateFilmsGenres = async function (filmeGenero) {
    try {
        
        // Script SQL
        let sql = `UPDATE tbl_genero SET 
        filme_id              =   ${filmeGenero.filme_id},  
        genero_id             =   ${filmeGenero.genero_id},
        where  id             =   ${filmeGenero.id};`
        
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
const setDeleteFilmsGenres = async function (id) {
    try {
        
        // Script SQL
        let sql = `DELETE FROM tbl_filme_genero where id = ${id};`
        
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
    getSelectAllFilmsGenres,
    getSelectByIdFilmsGenres,
    getSelectLastID,
    getSelectFilmsByIdGenre,
    getSelectGenresByIdFilm,
    setInsertFilmsGenres,
    setUpdateFilmsGenres,
    setDeleteFilmsGenres
}