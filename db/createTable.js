const options = require('./options/db')
const knex = require('knex')(options)

knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name')
    table.string('price')
    table.text('tumbnail')
})

    .then(() => console.log('Table created'))
    .catch(err => {console.log(err); throw(err)})
    .finally(() =>{
        knex.destroy()
    })