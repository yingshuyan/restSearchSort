const { db } = require('./db')
const port = 3030
const app = require('./app')
const {blue} = require('chalk')

const init =async()=> {
    try{
        const server = app.listen(port, () => console.log(blue(`Server listening on port 3030`)))
    }catch(er){
        console.log(er)
    }

}

init()