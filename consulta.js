const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "repertorio_db",
    port: 5432,


});
// Paso 2
/*
const getDate = async() => {
    const result = await pool.query("SELECT NOW()");
    return result;
};
*/


const insertar = async(datos) => {

    const consulta = {
        text: "INSERT INTO repertorio values(DEFAULT, $1, $2, $3, $4) RETURNING *",
        values: datos,
    }
    try {
        const result = await pool.query(consulta);
        console.log(result.rows[0]);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}




const consultar = async() => {
    try {
        const result = await pool.query("SELECT * FROM repertorio");
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}

//Funcion asíncrona para edición
const actualizar = async(id, datos) => {
    const consulta = {
        text: `UPDATE repertorio SET cancion=$1, artista=$2, tono=$3, link=$4 WHERE id=${id} RETURNING *`,
        values: datos,
        rowMode: "array"
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}



const eliminar = async(id) => {
    try {
        const result = await pool.query(`DELETE FROM repertorio WHERE id = '${id}'`);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}







// Paso 3
module.exports = { insertar, consultar, actualizar, eliminar };