const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { addNote, listNotes, readNote, updateNote, removeNote } = require('./notes.js');

const parser = yargs(hideBin(process.argv));

parser.command('add', 'Adicionar Novas Notas', (yargs) => {
    yargs.option('title', {description: 'Titulo Para a Nota', type: 'string', demandOption: true,})
    yargs.option('body', {description: 'Descrição Para a Nota', type: 'string', demandOption: true,})
}, (argv) => {addNote(argv);})

parser.command('list', 'Listar Todas as Notas', () => {}, () => {listNotes();});

parser.command('read', 'Ler uma Nota', (yargs) => {
    yargs.option('id', {description: 'ID da Nota', type: 'number', demandOption: true,})
}, (argv) => {readNote(argv);});

parser.command('update', 'Atualizar uma Nota', (yargs) => {
    yargs.option('id', {description: 'ID da Nota', type: 'number', demandOption: true,})
    yargs.option('newTitle', {description: 'Títutlo da Nota', type: 'string',})
    yargs.option('newBody', {description: 'Descrição da Nota', type: 'string',})
    yargs.check((argv) => {
        if (!argv.newTitle && !argv.newBody) {
            throw new Error("Erro: Você deve Informar ao Menos um Campo (--newTitle ou --newBody).")
        }
        return true;
    })
}, (argv) => {updateNote(argv);});

parser.command('remove', 'Remover Notas', (yargs) => {
    yargs.option('id', {description: 'ID da Nota', type: 'number', demandOption: true,})
}, (argv) => {removeNote(argv);});

parser.parse()