import { readFileSync } from 'fs'
import { Client } from 'ssh2'
import { config } from 'dotenv'
config()

const { host, port, username, password } = process.env

const conn = new Client()

conn.connect({
    host, port: Number(port), username, password
})

conn.on('ready', () => {
    console.log('Client is ready')
    conn.exec('cd $HOME', (err, stream) => {
        if (err) throw err
        stream.on('data', (data: any) => {
            console.log(`Output is :: ${data}`)

            conn.exec('~/santral_publish', (err, strPub) => {
                if (err) throw err
                strPub.on('data', (dataPub: any) => {
                    console.log(`Output is :: ${dataPub}`)
                })
            })
        })
    })
})

