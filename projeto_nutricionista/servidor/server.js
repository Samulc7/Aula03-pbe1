const express = require("express");
const consultas = require("../dados.json");

const app = express();
const porta = 3000;

app.use(express.urlencoded({ extended: true }));

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

const listarConsultas = (req, res) => {
    const consultasComIMC = consultas.map((consulta) => {
        const imc = calcularIMC(
            Number(consulta.peso),
            Number(consulta.altura)
        );

        return {
            ...consulta,
            imc: imc.toFixed(2)
        };
    });

    res.json(consultasComIMC);
};

const novaConsulta = (req, res) => {
    if (req.body) {
        const novaConsulta = {
            id: Number(req.body.id),
            data: req.body.data,
            paciente: req.body.paciente,
            peso: Number(req.body.peso),
            altura: Number(req.body.altura)
        };

        consultas.push(novaConsulta);

        res.send("Consulta cadastrada com sucesso!");
    } else {
        res.send("Erro ao cadastrar consulta.");
    }
};

const buscarPaciente = (req, res) => {
    const nome = req.query.nome;

    if (!nome) {
        return res.status(400).send("Informe o nome do paciente.");
    }

    const resultados = consultas.filter((consulta) =>
        consulta.paciente.toLowerCase().includes(nome.toLowerCase())
    );

    if (resultados.length === 0) {
        return res.status(404).send("Paciente não encontrado.");
    }

    res.json(resultados);
};

app.get("/", listarConsultas);

app.post("/", novaConsulta);

app.get("/buscar", buscarPaciente);

app.listen(porta, () => {
    console.log(`Servidor: http://127.0.0.1:${porta}`);
    console.log(`Cliente: abra o index.html com Live Server`);
});