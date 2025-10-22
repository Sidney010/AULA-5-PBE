/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL da tabela estudio
 * Data: 22/10/2025
 * Autor: Sidney
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca do PrismaClient
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os estudios de filme do banco de dados
const getSelectAllStudios = async function () {

    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_estudio order by estudio_id desc;`

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
//Retorna o id do último estudio cadastrado
const getSelectLastIdStudio = async function () {
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select estudio_id from tbl_estudio order by estudio_id desc limit 1;`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é uma ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].estudio_id)
        else
            return false

    } catch (error) {
        // console.log(error)
        return false

    }
}
//Retorna um estudio filtrando pelo ID do banco de dados
const getSelectByIdStudio = async function (id) {
    
    try {

        /* Select conforme a ordem dos itens
        *   order by id asc     -> ordem cresecente (ascendente)
        *   order by id desc    -> ordem descrescente   
        */


        //Script SQL
        let sql = `select * from tbl_estudio where estudio_id=${id};`

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
const setInsertStudio = async function (estudio) {
    try {
        
        // Script SQL
        let sql = `INSERT INTO tbl_estudio (    
            nome_fantasia, razao_social, cnpj, logradouro, numero, bairro, cidade,
            estado, pais, cep, complemento, email_contato, telefone, site_oficial
        )
        VALUES ('${estudio.nome_fantasia}', '${estudio.razao_social}', '${estudio.cnpj}',
                '${estudio.logradouro}', '${estudio.numero}', '${estudio.bairro}', 
                '${estudio.cidade}', '${estudio.estado}', '${estudio.pais}', '${estudio.cep}',
                '${estudio.complemento}', '${estudio.email_contato}', '${estudio.telefone}', '${estudio.site_oficial}'
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
//Atualiza uma estudio existente no banco de dados filtrando pelo ID
const setUpdateStudio = async function (estudio) {
    try {
        
        // Script SQL
        let sql = `UPDATE tbl_genero SET 
        nome_fantasia       = '${estudio.nome_fantasia}', 
        razao_social        = '${estudio.razao_social}', 
        cnpj                = '${estudio.cnpj}',
        logradouro          = '${estudio.logradouro}', 
        numero              = '${estudio.numero}', 
        bairro              = '${estudio.bairro}', 
        cidade              = '${estudio.cidade}',
        estado              = '${estudio.estado}', 
        pais                = '${estudio.pais}', 
        cep                 = '${estudio.cep}', 
        complemento         = '${estudio.complemento}', 
        email_contato       = '${estudio.email_contato}', 
        telefone            = '${estudio.telefone}', 
        site_oficial        = '${estudio.site_oficial}',
        where genero_id     =  ${nacionalidade.id};`
        
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
//Apaga um estudio existente no banco de dados filtrando pelo ID
const setDeleteStudio = async function (id) {
    try {
        
        // Script SQL
        let sql = `DELETE FROM tbl_estudio where estudio_id = ${id};`
        
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
    getSelectAllStudios,
    getSelectLastIdStudio,
    getSelectByIdStudio,
    setInsertStudio,
    setUpdateStudio,
    setDeleteStudio
}