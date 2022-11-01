const { options } = require('../../options/mariaDB');
const knex = require('knex')(options);

const crearTablaMariaDB = () => {
    knex.schema.createTable('products', table => {
        table.increments('id');
        table.string('nombre')
        table.integer('precio')
        table.string('foto')
    })
        .then(() => console.log("table created"))
        .catch(err => { console.log(err); throw err })
        .finally(() => knex.destroy());
}

module.exports = crearTablaMariaDB;