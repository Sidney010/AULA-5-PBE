/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL da tabela ator
 * Data: 12/11/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/
//Import da biblioteca do PrismaClient
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os atores de filme do banco de dados
const getSelectAllActor = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_ator order by ator_id;`

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
//Retorna o id da último ator cadastrada
const getSelectLastIdActor = async function () {
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select ator_id from tbl_ator order by ator_id desc limit 1;`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].ator_id)
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }
}
//Retorna um ator filtrando pelo ID do banco de dados
const getSelectByIdActor = async function (id) {
    
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_ator where ator_id=${id};`

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
const setInsertActor = async function (ator) {
    try {
        
        // Script SQL
        let sql = `INSERT INTO tbl_ator (nome, data_nascimento, data_falecimento, altura, conjuge, filhos, biografia) 
                VALUES
                    (
                        "${ator.nome}",
                        "${ator.data_nascimento}",
                        "${ator.data_falecimento}",
                        ${ator.altura},
                        "${ator.conjuge}",
                        "${ator.filhos}",
                        "${ator.biografia}"
                    );`
        
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
//Atualiza um ator existente no banco de dados filtrando pelo ID
const setUpdateActor = async function (ator) {
    try {
        
        // Script SQL
        let sql = `UPDATE tbl_ator SET
                         nome = "${ator.nome}",
                         data_nascimento = "${ator.data_nascimento}",
                         data_falecimento = "${ator.data_falecimento}",
                         altura = ${ator.altura},
                         conjuge = "${ator.conjuge}",
                         filhos = "${ator.filhos}",
                         biografia = "${ator.biografia}"
                   WHERE ator_id = ${id};`
        
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
//Apaga um ator existente no banco de dados filtrando pelo ID
const setDeleteActor = async function (id) {
    try {
        
        // Script SQL
        let sql = `DELETE FROM tbl_ator where ator_id = ${id};`
        
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
    getSelectAllActor,
    getSelectLastIdActor,
    getSelectByIdActor,
    setInsertActor,
    setUpdateActor,
    setDeleteActor
}