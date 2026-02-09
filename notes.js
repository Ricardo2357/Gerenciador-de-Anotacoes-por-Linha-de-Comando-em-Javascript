const fs = require('fs/promises');
const { DateTime } = require('luxon');

const addNote = async (argv) => {
    const caminho = "./notes.json";
    let id;
    let conteudo_json = [];
    let titulos_iguais = false;

    try {
        const conteudo = await fs.readFile(caminho);
        conteudo_json = JSON.parse(conteudo)
    } catch (error) {
        conteudo_json = [];
    }

    for (let i = 0; i < conteudo_json.length; i++) {
        if (argv.title.toLowerCase() == conteudo_json[i].title.toLowerCase()) {
            titulos_iguais = true;
            break;
        }
    }

    if (titulos_iguais) {
        console.log("Erro: Título já Existente.");
        return;
    }

    if (conteudo_json.length > 0) {
        id = conteudo_json[conteudo_json.length - 1].id + 1;
    } else {
        id = 1;
    }

    const nova_nota = {
        id: id,
        title: argv.title,
        body: argv.body,
        createdAt: DateTime.local().toISO(),
    };

    conteudo_json.push(nova_nota)
    await fs.writeFile(caminho, JSON.stringify(conteudo_json, null, 2))

    console.log(`Nota '${argv.title}' Adicionada com Sucesso!`);
};

const listNotes = async () => {
    const caminho = "./notes.json";
    let conteudo_json = [];
    let titulo;
    let data;
    let id;

    try {
        const conteudo = await fs.readFile(caminho);
        conteudo_json = JSON.parse(conteudo);
    } catch {
        console.log("Nenhuma Nota Encontrada.");
        return
    }

    if (conteudo_json.length == 0) {
        console.log("Nenhuma Nota Encontrada.");
        return;
    }

    console.log("Suas Notas:");

    for (let i = 0; i < conteudo_json.length; i++) {
        id = conteudo_json[i].id
        titulo = conteudo_json[i].title

        let strdata = conteudo_json[i].createdAt
        data = DateTime.fromISO(strdata).toFormat('dd/MM/yyyy');

        console.log(`- ${id} (Criada em: ${data}) ${titulo}`);
    }
}

const readNote = async (argv) => {
    const caminho = "./notes.json";
    let conteudo_json = [];
    let id_encontrado = false;
    let descricao;
    let titulo;
    let data;
    let id;

    try {
        const conteudo = await fs.readFile(caminho);
        conteudo_json = JSON.parse(conteudo);
    } catch {
        console.log("Nenhuma Nota Encontrada.");
        return
    }

    for (let i = 0; i < conteudo_json.length; i++) {
        if (argv.id == conteudo_json[i].id) {
            id_encontrado = true;

            id = conteudo_json[i].id;
            titulo = conteudo_json[i].title;
            descricao = conteudo_json[i].body;

            let strdata = conteudo_json[i].createdAt
            data = DateTime.fromISO(strdata).toFormat('dd/MM/yyyy HH:mm');
        }
    }

    if (id_encontrado) {
        console.log("----------------------------------------");
        console.log(`ID: ${id}`);
        console.log(`Título: ${titulo}`);
        console.log(`Criada em: ${data}`);
        console.log("----------------------------------------\n");
        console.log(descricao);
    } else {
        console.log("Erro: ID não Encontrado.");
        return
    }
}

const updateNote = async (argv) => {
    const caminho = "./notes.json";
    let conteudo_json = [];
    let id_encontrado = false
    let titulos_iguais = false;

    try {
        const conteudo = await fs.readFile(caminho);
        conteudo_json = JSON.parse(conteudo);
    } catch {
        console.log("Nenhuma Nota Encontrada.");
        return
    }

    if (conteudo_json.length == 0) {
        console.log("Nenhuma Nota Encontrada.");
        return;
    }

    for (let i = 0; i < conteudo_json.length; i++) {
        if (argv.id == conteudo_json[i].id) {
            id_encontrado = true;
        }
        if (argv.newTitle && argv.newTitle.toLowerCase() == conteudo_json[i].title.toLowerCase() && argv.id != conteudo_json[i].id) {
            titulos_iguais = true;
        }
    }

    if (id_encontrado) {
        if (titulos_iguais) {
            console.log("Erro: Título Digitado já Existente.");
            return
        } 
        conteudo_json = conteudo_json.map(item => {
            if (item.id == argv.id) {
                return { ...item, title: argv.newTitle || item.title,  body: argv.newBody || item.body };
            }
            return item;
        });
    } else {
        console.log("Erro: ID não Encontrado.");
        return
    }

    await fs.writeFile(caminho, JSON.stringify(conteudo_json, null, 2))
    console.log("Nota Editada com Sucesso!");
}

const removeNote = async (argv) => {
    const caminho = "./notes.json";
    let conteudo_json = [];
    let id_encontrado = false

    try {
        const conteudo = await fs.readFile(caminho);
        conteudo_json = JSON.parse(conteudo);
    } catch {
        console.log("Nenhuma Nota Encontrada.");
        return
    }

    if (conteudo_json.length == 0) {
        console.log("Nenhuma Nota Encontrada.");
        return;
    }

    for (let i = 0; i < conteudo_json.length; i++) {
        if (argv.id == conteudo_json[i].id) {
            id_encontrado = true;
        }
    }

    if (id_encontrado) {
        conteudo_json = conteudo_json.filter(item => item.id != argv.id);
        await fs.writeFile(caminho, JSON.stringify(conteudo_json, null, 2))
        console.log("Nota Removida com Sucesso!");
    } else {
        console.log("Erro: ID não Encontrado.");
    }
}

module.exports = {
    addNote,
    listNotes,
    readNote,
    updateNote,
    removeNote
};