const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: '../DB/messages.sqlite',
    },
    useNullAsDefault: true
});

const crearTablaSqlLite = () => {
    knex.schema.createTable('messages', table => {
        table.string('email')
        table.integer('date')
        table.string('text')
    })
        .then(() => console.log("table created"))
        .catch(err => { console.log(err); throw err })
        .finally(() => knex.destroy());
}

module.exports = crearTablaSqlLite;