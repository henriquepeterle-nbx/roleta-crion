# Roleta Cirion

Aplicação web para a dinâmica da roleta da Cirion, pronta para rodar localmente com Node e para publicar na Vercel.

## Como rodar

No diretório do projeto, crie o `.env` a partir de `.env.example` e suba o servidor:

```bash
npm start
```

Depois abra:

```text
http://localhost:4173
```

## Fluxo implementado

- Tela inicial com logo da Cirion
- Cadastro com nome, telefone, e-mail e interesse em `FIBER` ou `DATA CENTER`
- Roleta com 8 áreas
- Pergunta antes de liberar prêmio
- Resultado final e retorno automático para a tela inicial
- Limite de `1 Alexa por dia` no mesmo navegador/dispositivo

## Onde editar o conteúdo

Tudo fica em [`app.js`](/Users/henriquepeterle/Desktop/Cirion/app.js):

- `WHEEL_SEGMENTS`: define as 8 áreas da roleta
- `QUESTION_BANK`: define as perguntas e respostas para `FIBER` e `DATA CENTER`

## Leads e controle

Os cadastros e resultados continuam salvos em `localStorage` no navegador.

Além disso:

- o formulário cria um registro no Supabase em `LEADS`
- `reason` recebe `FIBER` ou `DATA CENTER`
- `prize` começa como `false`
- quando o participante ganha o prêmio e acerta a pergunta, o lead é atualizado para `prize = true`

Para abrir o painel admin e exportar CSV:

```text
http://localhost:4173/?admin=1
```

O painel admin permite:

- Exportar os leads em CSV
- Resetar a Alexa do dia
- Limpar os dados salvos no navegador

## Backend e deploy

O projeto roda localmente com [`server.js`](/Users/henriquepeterle/Desktop/Cirion/server.js), que:

- serve os arquivos estáticos
- expõe `POST /api/leads`
- expõe `PATCH /api/leads/:id`
- mantém a chave do Supabase no servidor, não no navegador

Para deploy na Vercel, as mesmas rotas existem em:

- [`api/leads/index.js`](/Users/henriquepeterle/Desktop/Cirion/api/leads/index.js)
- [`api/leads/[id].js`](/Users/henriquepeterle/Desktop/Cirion/api/leads/[id].js)
- [`api/health.js`](/Users/henriquepeterle/Desktop/Cirion/api/health.js)

Variáveis necessárias na Vercel:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
