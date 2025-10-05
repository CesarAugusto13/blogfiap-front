# EducaOn - Aplicação de Blogging Dinâmico

## Descrição

EducaOn é uma aplicação web de blogging dinâmico voltada para professores e estudantes, desenvolvida como parte do Tech Challenge do curso. Permite criar, editar, ler e administrar postagens, além de autenticação exclusiva para professores.

---

## Funcionalidades

- Listagem de posts com busca por palavras-chave
- Visualização detalhada de posts com comentários e curtidas
- Cadastro e login de professores com autenticação JWT
- Criação, edição e exclusão de postagens via interface administrativa
- Sidebar expansível para navegação intuitiva
- Interface responsiva para dispositivos móveis e desktops

---

## Tecnologias Utilizadas

- **Front-end:** React (hooks, componentes funcionais), React Router, CSS modularizado
- **Back-end:** Node.js (API REST já implementada)
- **Comunicação:** Axios para chamadas HTTP
- **Autenticação:** JWT (JSON Web Tokens)
- **Outros:** LocalStorage para armazenamento de token e curtidas

---

## Estrutura do Projeto

```
/blogfiap-front
├── /src
│   ├── /components
│   │   └── Sidebar.jsx
│   ├── /pages
│   │   ├── HomePage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── PostDetail.jsx
│   │   └── AdminPage.jsx
│   ├── /services
│   │   └── api.js
│   ├── /assets
│   │   └── heart.icon.svg
│   ├── /styles
│   │   ├── Login.css
│   │   ├── Register.css
│   │   ├── PostDetail.css
│   │   └── AdminPage.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- npm ou yarn
- Back-end Node.js rodando com os endpoints REST disponíveis (verificar repositório do back-end: [Back-end](https://github.com/CesarAugusto13/BlogFiap))

### Passos

1. Clone o repositório:

    ```bash
    git clone https://github.com/CesarAugusto13/blogfiap-front.git
    cd blogfiap-front
    ```

2. Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

3. Configure a URL base da API no arquivo `src/services/api.js` (se necessário).

4. Inicie a aplicação:

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5. Acesse no navegador:

    ```
    http://localhost:3000
    ```

---

## Arquitetura da Aplicação

- A aplicação é dividida em páginas React que consomem os endpoints REST do back-end.
- A navegação é feita via React Router.
- A sidebar é um componente fixo e expansível para facilitar a navegação.
- O estado local é gerenciado com hooks `useState` e `useEffect`.
- A autenticação é feita via JWT armazenado no `localStorage`.
- As chamadas HTTP são feitas com Axios, com tratamento básico de erros.
- A estilização é feita com CSS modularizado para cada página.

---

## Guia de Uso

- **Login:** Professores podem acessar a área administrativa após autenticação.
- **Registro:** Novos professores podem se cadastrar.
- **Home:** Lista de posts com busca.
- **Detalhes do Post:** Visualização completa, curtidas e comentários.
- **Admin:** Criar, editar e excluir posts (acesso restrito a professores autenticados).

---

## Desafios e Experiências

- Integração do front-end React com back-end Node.js via REST.
- Implementação de autenticação JWT e controle de acesso.
- Criação de uma interface responsiva e intuitiva com sidebar expansível.
- Gerenciamento de estado e tratamento de erros para melhor UX.
- Organização do código e separação de estilos para manutenção facilitada.

---

## Contato

Para dúvidas ou sugestões, entre em contato:

- **Nome:** César Augusto de Oliveira Santos
- **Email:** cesiha13@gmail.com
- **GitHub:** [https://github.com/CesarAugusto13](https://github.com/CesarAugusto13)