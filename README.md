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
- Entrada direta na roleta, sem formulário
- Roleta com 8 áreas
- Resultado imediato de ganho, perda ou `Spin Again`
- Efeito sonoro de vitória ou derrota
- Resultado final e retorno automático para a tela inicial
- Limite de `1 Alexa of the Day` no mesmo navegador/dispositivo

## Onde editar o conteúdo

Tudo fica em [`app.js`](/Users/henriquepeterle/Desktop/Cirion/app.js):

- `WHEEL_SEGMENTS`: define as 8 áreas da roleta
- `QUESTION_BANK`: define as perguntas e respostas para `FIBER` e `DATA CENTER`

## Data

O fluxo atual não coleta dados de participantes e não depende de Supabase.

O único dado salvo localmente é o controle de `1 Alexa of the Day` por navegador/dispositivo.

## Backend e deploy

O projeto continua rodando localmente com [`server.js`](/Users/henriquepeterle/Desktop/Cirion/server.js) para servir os arquivos estáticos.
