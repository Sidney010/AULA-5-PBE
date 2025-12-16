/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de dados no Banco de Dados MySQL relacionamento da tabela filme e estudio
 * Data: 5/11/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca do PrismaClient
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os filmes e estudios de filme do banco de dados
const getSelectAllFilmsStudio = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_filme_estudio order by id desc;`

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
//Retorna o id do último filme e estudio cadastrado
const getSelectLastID = async function () {
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select id from tbl_filme_estudio order by id desc limit 1;`

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
//Retorna um filme e estudio filtrando pelo ID do banco de dados
const getSelectByIdFilmsStudios = async function (id) {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_filme_estudio where id=${id};`

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
//Retorna estudios filtrando pelo ID do filme do banco de dados
const getSelectStudioByIdFilm = async function (idFilme) {

    try {

        //Script SQL
        let sql = `select tbl_estudio.estudio_id, tbl_estudio.nome_fantasia
                     from tbl_filme
                        inner join tbl_filme_estudio
                            on tbl_filme.filme_id = tbl_filme_estudio.filme_id
                        inner join tbl_estudio
                            on tbl_estudio.estudio_id = tbl_filme_estudio.estudio_id
                    where tbl_filme.filme_id=${idFilme};`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false

    }

}

// //Retorna filmes filtrando pelo ID do estudio do banco de dados
const getSelectFilmsByIdStudio = async function (idEstudio) {

    try {

        //Script SQL
        let sql = `select tbl_filme.filme_id, tbl_filme.nome
                     from tbl_filme
                        inner join tbl_filme_estudio
                            on tbl_filme.filme_id = tbl_filme_estudio.filme_id
                        inner join tbl_estudio
                            on tbl_estudio.estudio_id = tbl_filme_estudio.estudio_id
                    where tbl_estudio.estudio_id=${idEstudio};`

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

//Insere um estudio no banco de dados
const setInsertFilmsStudio = async function (filmeEstudio) {
    try {

        // Script SQL
        let sql = `INSERT INTO tbl_filme_estudio (filme_id, estudio_id)
        VALUES (${filmeEstudio.filme_id}, ${filmeEstudio.estudio_id});`

        // Por variavel é Unsafe
        // $executeRawUnsafe () -> Permite apenas executar scripsts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}
//Atualiza um elemento existente no banco de dados filtrando pelo ID
const setUpdateFilmsStudio = async function (filmeEstudio) {
    try {

        // Script SQL
        let sql = `UPDATE tbl_filme_estudio SET 
        filme_id              =   ${filmeEstudio.filme_id},  
        estudio_id             =   ${filmeEstudio.estudio_id},
        where  id             =   ${filmeEstudio.id};`

        // Por variavel é Unsafe
        // $executeRawUnsafe () -> Permite apenas executar scripsts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}
//Apaga um elemento existente no banco de dados filtrando pelo ID
const setDeleteFilmsStudio = async function (id) {
    try {

        // Script SQL
        let sql = `DELETE FROM tbl_filme_estudio where id = ${id};`

        // Por variavel é Unsafe
        // $executeRawUnsafe () -> Permite apenas executar scripsts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllFilmsStudio,
    getSelectByIdFilmsStudios,
    getSelectFilmsByIdStudio,
    getSelectLastID,
    getSelectStudioByIdFilm,
    setDeleteFilmsStudio,
    setInsertFilmsStudio,
    setUpdateFilmsStudio
}