const options = {
    client: 'sqlite3',
    connection: {
        filename: './DB/messages.sqlite',
    },
    useNullAsDefault: true
}

module.exports = { options }