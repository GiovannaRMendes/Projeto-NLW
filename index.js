// JavaScript é fracamente tipada, então
// ao tentar mudar a informção da variável
// para outro tipo (ex.: 2), não será possível.
let mensagem = "Hello world!"
const texto = "Olá a todos"

{
    const texto = "Olá, mundo!"
    console.log(texto)
}

// Pode executar no bash com "node index.js"
console.log(mensagem);
console.log(texto)


// Falando sobre arrays, objetos e concatenação
let lista = ["alo", "usuário"]
console.log(lista[0] + ", " + lista[1])

let meta = {
    value: 'ler um livro por mês',
    checked: false,
    // log: (info) => {console.log(info)}
}

// meta.value = "Ler dois livros por mês"
// meta.log(meta.value)


// Falando sobre função e arrow function
const criarMeta_1 = () => {}
function criarMeta_2() {}


// última parte mostrada no vídeo
let metas = [
    meta, 
    {
        value: "Caminhar 5km 3 vezes na semana",
        checked: false
    }
]

// Pega só o primeiro
console.log(meta.value)

console.log(metas[0].value)
console.log(metas[1].value)