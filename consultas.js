const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "repertorio_db",
    port: 5432,
})

// Funcion asíncrona para insertar datos
const insertar = async (datos) => {
    const sqlQuery = {
        text: 'INSERT INTO repertorio (cancion, artista, tono) VALUES ($1, $2, $3) RETURNING *',
        values: datos,
        rowMode: 'array'
    }
    try {
        const resultado = await pool.query(sqlQuery)
        return resultado.rows[0]

    } catch (error) {
        console.log(error.code)
        return error
    }
}

// Funcion que consulta todos los datos
const consultar = async (datos) => {
    try {
        const resultado = await pool.query('SELECT * FROM repertorio')
        return resultado.rows
    } catch (error) {
        console.log(error.code)
        return error
    }
}

// Funcion que edita datos
const actualizar = async (id, datos) => {
    const sqlQuery = {
        text: `UPDATE repertorio SET cancion = $1, artista = $2, tono = $3, link = $4 WHERE id=${id} RETURNING *`,
        values: datos,
        rowMode: 'array'
    }
    try {
        const resultado = await pool.query(sqlQuery)
        return resultado.rows[0]
    } catch (error) {
        console.log(error.code)
        return error
    }
}
// Funcion que elimina datos
const eliminar = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM repertorio WHERE id = '${id}'`)
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }
}


// Paso 3
module.exports = { insertar, consultar, actualizar, eliminar }