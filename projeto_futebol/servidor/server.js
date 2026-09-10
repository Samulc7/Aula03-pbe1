const express = require('express')
const clubes = require('../dados.json')


// LISTAR CLUBES
const listarClubes = (req, res) => {

    const clubesCalculados = clubes.map(clube => {

        const jogos =
            Number(clube.vitorias) +
            Number(clube.empates) +
            Number(clube.derrotas)

        const pontos =
            (Number(clube.vitorias) * 3) +
            Number(clube.empates)

        return {
            ...clube,
            jogos: jogos,
            pontos: pontos
        }
    })

    res.send({
        clubes: clubesCalculados
    })
}


// CADASTRAR NOVO CLUBE
const novoClube = (req, res) => {

    if (req.body) {

        clubes.push({
            id: Number(req.body.id),
            nome: req.body.nome,
            vitorias: Number(req.body.vitorias),
            empates: Number(req.body.empates),
            derrotas: Number(req.body.derrotas)
        })

        res.send("Clube cadastrado com sucesso!")

    } else {

        res.status(400).send("Erro ao cadastrar clube")

    }
}


// EXCLUIR CLUBE
const excluirClube = (req, res) => {

    const id = req.params.id
    let status = 0

    clubes.forEach((clube, indice) => {

        if (clube.id == id) {

            status = 1

            clubes.splice(indice, 1)
        }
    })

    if (status == 1) {

        res.send("Clube excluído com sucesso!")

    } else {

        res.status(404).send("Clube não encontrado")
    }
}


// ATUALIZAR CLUBE
const atualizarClube = (req, res) => {

    const id = req.query.id
    const dados = req.body

    let status = 0

    clubes.forEach((clube) => {

        if (clube.id == id) {

            status = 1

            clube.nome = dados.nome
            clube.vitorias = Number(dados.vitorias)
            clube.empates = Number(dados.empates)
            clube.derrotas = Number(dados.derrotas)
        }
    })

    if (status == 1) {

        res.send("Clube atualizado com sucesso!")

    } else {

        res.status(404).send("Clube não encontrado")
    }
}


// CONFIGURAÇÃO DO SERVIDOR
const porta = 3000

const app = express()

app.use(express.urlencoded({ extended: true }))


// ROTAS

app.post("/", novoClube)          // Cadastrar
app.get("/", listarClubes)        // Listar
app.delete("/:id", excluirClube)  // Excluir
app.patch("/", atualizarClube)    // Atualizar


// INICIAR SERVIDOR
app.listen(porta, () => {

    console.log(`Servidor http://127.0.0.1:${porta}`)
    console.log(`Cliente http://127.0.0.1:5500/cliente/`)

})