# Roleta Cirion

Aplicação web para captura de leads e dinâmica da roleta da Cirion, pronta para rodar localmente com Node e para publicar na Vercel.

## Como rodar

Crie o `.env` a partir de `.env.example` e suba o servidor:

```bash
npm start
```

Depois abra:

```text
http://localhost:4173
```

## Variáveis de ambiente

```text
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
SUPABASE_LEADS_TABLE=LEADS
```

`SUPABASE_LEADS_TABLE` é opcional. Se não for informado, o backend usa `LEADS`.

## Fluxo implementado

- Formulário de cadastro em página única antes da roleta
- Persistência do lead no Supabase
- Teclado virtual embutido para uso em tela touch com PC
- Switch de idioma `EN / PT-BR`
- Roleta com 8 áreas
- Resultado imediato de ganho, perda ou `Spin Again`
- Efeito sonoro de giro, vitória e derrota
- Retorno automático para o formulário após o resultado final

## Schema esperado no Supabase

Tabela com os campos:

- `id`
- `created_at`
- `first_name`
- `last_name`
- `country`
- `company`
- `email`
- `job_title`
- `area_code`
- `phone_number`

## Onde editar

- [app.js](/Users/henriquepeterle/Desktop/Cirion/app.js): textos, lógica da roleta, formulário e teclado virtual
- [styles.css](/Users/henriquepeterle/Desktop/Cirion/styles.css): layout responsivo
- [lib/leads-api.js](/Users/henriquepeterle/Desktop/Cirion/lib/leads-api.js): integração com o Supabase
