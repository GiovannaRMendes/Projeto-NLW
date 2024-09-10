// Necessita de um módulo que vem de fora
const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: "Caminhar todo dia",
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {

    const meta = await input({ message: "Digite a meta:"})

    if (meta.length == 0) {
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push(
        { value: meta, checked: false}
    )
}

const listarMetas = async () => {

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço, para marcar/desmarcar e o Enter, para finalizar a etapa",
        
        // Fazendo uma cópia das metas
        choices: [...metas],
        instructions: false,
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada.")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluída(s).")
}

const start = async () => {

    while (true) {

        // await = espera o usuário escolher uma opção
        const opcao  = await select({
            message: " Menu >",

            // Aqui está presente um array e objetos
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar meta",
                    value: "Listar"
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

            case "Sair":
                console.log("Até a próxima ;)")
                return
        }
    }
}

start();