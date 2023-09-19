# Teste Franq (front-end)

## Sobre o Projeto

O projeto franq-frontend é uma aplicação que mostra as cotações de moedas atuais. Ele permite que os usuários acompanhem as cotações de várias moedas em tempo real. É uma ferramenta útil para investidores, viajantes e qualquer pessoa interessada em acompanhar as flutuações das moedas.

## Configuração recomendada do IDE

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (e desabilite o Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Personalização da configuração

Consulte [Referência de Configuração do Vite](https://vitejs.dev/config/).

## Setup do Projeto
```sh
npm install
```

### Criação do arquivo .env

Crie um arquivo `.env` no diretório raiz do seu projeto e adicione a seguinte linha nele:
```sh
VITE_API_KEY=SUA_CHAVE_DA_API_AQUI
```

Certifique-se de substituir `SUA_CHAVE_DA_API_AQUI` pela sua chave de API real.

### Compilar e Atualizar com Hot-Reload para Desenvolvimento

```sh
npm run dev
```

### Compilar e Minificar para Produção

```sh
npm run build
```

### Verificação de Estilo com [ESLint](https://eslint.org/)

```sh
npm run lint
```

