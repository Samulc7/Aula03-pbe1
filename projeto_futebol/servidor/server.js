const express = require("express");
const clubes = require("../dados.json");

const app = express();
const porta = 3000;

app.use(express.urlencoded({ extended: true }));

function calcularJogos(vitorias, empates, derrotas) {
    return vitorias + empates + derrotas;
}

function calcularPontos(vitorias, empates) {
    return (vitorias * 3) + empates;
}

const listarClubes = (req, res) => {

    const clubesCalculados = clubes.map((clube) => {

        const jogos = calcularJogos(
            Number(clube.vitorias),
            Number(clube.empates),
            Number(clube.derrotas)
        );

        const pontos = calcularPontos(
            Number(clube.vitorias),
            Number(clube.empates)
        );

        return {
            ...clube,
            jogos: jogos,
            pontos: pontos
        };

    });

    res.json(clubesCalculados);
};

const novoClube = (req, res) => {

    if (req.body) {

        const novoClube = {
            id: Number(req.body.id),
            nome: req.body.nome,
            vitorias: Number(req.body.vitorias),
            empates: Number(req.body.empates),
            derrotas: Number(req.body.derrotas)
        };

        clubes.push(novoClube);

        res.send("Clube cadastrado com sucesso!");

    } else {

        res.send("Erro ao cadastrar clube.");

    }
};

app.get("/", listarClubes);

app.post("/", novoClube);

app.listen(porta, () => {
    console.log(`Servidor: http://127.0.0.1:${porta}`);
    console.log(`Cliente: abra o index.html com Live Server`);
});