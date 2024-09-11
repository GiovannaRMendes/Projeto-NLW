// Necessita de um módulo que vem de fora
const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem-vindo ao App de Gerenciamento de Metas";
let metas


const carregarMetas = async () => {

    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch (erro) {
        metas = []
    }
}


const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


const cadastrarMeta = async () => {

    const meta = await input({ message: "Digite a meta:" })

    if (meta.length == 0) {
        mensagem = "A meta não pode ser vazia."
        return
    }

    metas.push(
        { value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso."
}


const listarMetas = async () => {

    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço, para marcar/desmarcar e o Enter, para finalizar a etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada."
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcadas como concluída(s)."
}


const metasRealizadas = async () => {

    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem = "Não existem metas realizadas :("
        return
    }

    await select({
        message: "Quantidade de metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}


const metasAbertas = async () => {

    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = "Não exitem metas abertas :D"
        return
    }

    await select({
        message: "Quantidade de metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}


const deletarMetas = async () => {

    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Selecione item(ns) para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itensADeletar.length == 0) {
        mensagem = "Nenhum item para deletar."
        return
    }

    itensADeletar.forEach((item) => {

        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}


const mostrarMensagens = () => {
    console.clear();

    if (mensagem != '') {
        console.log(mensagem)
        console.log('')
        mensagem = ''
    }
}


const start = async () => {
    await carregarMetas()

    while (true) {
        mostrarMensagens()
        await salvarMetas()

        const opcao  = await select({
            message: " Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "Listar"
                },
                {
                    name: "Metas realizadas",
                    value: "Realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "Abertas"
                },
                {
                    name: "Deletar metas",
                    value: "Deletar"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }
            ]
        })

        switch(opcao) {

            case "Cadastrar":
                await cadastrarMeta()
                break

            case "Listar":
                await listarMetas()
                break

            case "Realizadas":
                await metasRealizadas()
                break

            case "Abertas":
                await metasAbertas()
                break

            case "Deletar":
                await deletarMetas()
                break

            case "Sair":
                console.log("Até a próxima ;)")
                return
        }
    }
}

start();