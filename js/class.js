const options_sqlite = require('../db/options/db')
const knex_sqlite = require('knex')(options_sqlite)

const options_mysql = require('../db/options/db_mysql')
const knex_mysql = require('knex')(options_mysql)

    class Container{
    constructor(){
     this.readData()
     this.readMessages()
    }

   async readData() {
        let products = [];
        await knex_mysql.from('products').select('*')
                .then( rows => {
                    products.push(...rows)
                })
                .catch(err => console.log(err))
        return this.readJson = products
    }
    
    saveFile(obj){
        knex_mysql('products').insert(obj)
            .then(() => console.log('data inserted'))
            .catch(err => console.log(err))
        }

    getAll(){
        this.readData()
        return this.readJson
    }

    sendMessage(data){
        knex_sqlite('messages').insert(data)
            .then(() => console.log('data inserted'))
            .catch(err => console.log(err))
            // .finally(() => knex.destroy())
    }

       async readMessages(){
       let messages = [];

       await knex_sqlite.from('messages').select('*')
            .then( rows => {
                messages.push(...rows)
            })
            .catch(err => console.log(err))
            // .finally(() => knex.destroy())
            
            return this.readJsonMsg = messages;
    }
    getMessages(){
        return this.readJsonMsg
    }
}

module.exports = Container


// ---