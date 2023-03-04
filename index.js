import express from 'express'
import router from './router/router.js'
import cors from 'cors'
const PORT = 4000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)


app.listen(PORT, (error) => {
    if(error) {
        console.log('Ошибка создания сервера', error)
    } else {
        console.log(PORT, 'started')
    }
})
