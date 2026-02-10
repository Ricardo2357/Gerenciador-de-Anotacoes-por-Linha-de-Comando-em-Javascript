# Gerenciador-de-Anotacoes-por-Linha-de-Comando-em-Javascript


<p align = "left">
<img src = "https://img.freepik.com/vetores-premium/ilustracao-plana-de-membros-da-equipe-abordando-questoes-com-resolucao-de-problemas-estrategicos-em-quadro-branco_269730-3426.jpg" alt = "Banner do Gerenciador de Anotações" width = "500">
</p>

## Demonstração

![Imagem do Terminal](assets/Gerenciador-de-Anotações-Terminal.png)

Interface do gerenciador de anotações em execução no terminal.

## Instalação e Pré-requisitos

### Pré-requisitos

- Node.js na versão LTS;
- Terminal ou prompt de comando para executar o programa;
- Sistema operacional Windows, Linux ou macOS.

### Passos para Instalar

1. Baixe ou clone o projeto;
2. Verifique se você possui Node.js instalado no computador.

### Como Instalar as Dependências

1. Abra o Terminal, dentro da pasta do projeto;
   
2. Execute o seguinte comando para instalar as dependências:
   ```
   npm install
   ```
   
## Como Utilizar

1. No terminal, digite "node app.js add", com "--newTitle" (Título) e "--newBody" (Descrição) como argumentos, para adicionar uma nova nota.

2. No terminal, digite "node app.js list" para listar todas as notas existentes, com ID, data da criação e título de cada.

3. No terminal, digite "node app.js read", com "--id" como argumento, para exibir as informações de uma nota: ID, título, data e hora da criação e descrição.

4. No terminal, digite "node app.js update", com "--id", "--newTitle" (Título) e "--newBody" (Descrição) como argumentos, para editar uma nota já existente.

5. No terminal, digite "node app.js remove", com "--id" como argumento, para remover uma nota.

## Estrutura do Projeto

```
Gerenciador-de-Anotações-por-Linha-de-Comando-em-Javascript/
├── assets/
│   └── Gerenciador-de-Anotações-Terminal.png
├── LICENSE
├── README.md
├── app.js
├── notes.js
├── notes.json
├── package.json
└── package-lock.json
```

## Licença 

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes. 
