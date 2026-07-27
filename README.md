# PortalBrasil: Intranet 🚀

[![Built with Cookieplone](https://img.shields.io/badge/built%20with-Cookieplone-0083be.svg?logo=cookiecutter)](https://github.com/plone/cookieplone-templates/)
[![Testes](https://github.com/portal-br/intranet/actions/workflows/main.yml/badge.svg)](https://github.com/portal-br/intranet/actions/workflows/main.yml)

Solução de Intranet construída com PortalBrasil & Plone

## Início Rápido 🏁

### Pré-requisitos ✅

Certifique-se de ter os seguintes itens instalados:

-   Um [sistema operacional](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) que suporte todos os pré-requisitos listados.
-   [uv](https://6.docs.plone.org/install/create-project-cookieplone.html#uv)
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 24
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)


### Instalação 🔧

1. Clone o repositório:

```shell
git clone git@github.com:portal-br/intranet.git
cd intranet
```

2. Instale tanto o Backend quanto o Frontend:

```shell
make install
```


### Inicialize os Servidores 🔥

1. Crie um novo site Plone na primeira execução:

```shell
make backend-create-site
```

2. Inicie o Backend em [http://localhost:8080/](http://localhost:8080/):

```shell
make backend-start
```

3. Em um novo terminal, inicie o Frontend em [http://localhost:3000/](http://localhost:3000/):

```shell
make frontend-start
```

Voilá! O ambiente de desenvolvimento da Intranet está no ar e funcionando! 🎉

### Implantação Local com Stack 📦

Implemente um ambiente local com `Docker Compose`, incluindo:

- Imagens Docker para Backend e Frontend 🖼️
- Um stack com um roteador Traefik e um banco de dados Postgres 🗃️
- Acessível em [http://portalbrasil-intranet.localhost](http://portalbrasil-intranet.localhost) 🌐

Execute os seguintes comandos:

```shell
make stack-create-site
make stack-start
```

E... pronto! A intranet está no ar e funcionando! 🎉

## Estrutura do Projeto 🏗️

Este monorepo consiste em três seções distintas: `backend`, `frontend` e `devops`.

- **backend**: Abriga a API e a instalação do Plone, utilizando pip em vez de buildout, e inclui um pacote de políticas chamado portalbrasil.intranet.
- **frontend**: Contém o pacote React (Volto).
- **devops**: Abrange a Stack Docker, playbooks Ansible e configurações de Cache.

### Por que essa Estrutura? 🤔

- Todo o código necessário para rodar o site está contido no repositório (exceto addons existentes para Plone e React).
- Workflows específicos do GitHub são acionados com base em alterações em cada base de código (consulte .github/workflows).
- Facilita a criação de imagens Docker para cada base de código.
- Demonstra a instalação/configuração do Plone sem o uso do buildout.

## Garantia de Qualidade do Código 🧐

Para formatar automaticamente seu código e garantir que ele atenda aos padrões de qualidade, execute:

```shell
make check
```

### Formatar a base de código

To format and rewrite the code base, ensuring it adheres to quality standards, run the following shell command.

```shell
make format
```

| Section | Tool | Description | Configuration |
| --- | --- | --- | --- |
| backend | Ruff | Python code formatting, imports sorting  | [`backend/pyproject.toml`](./backend/pyproject.toml) |
| backend | `zpretty` | XML and ZCML formatting  | -- |
| frontend | ESLint | Fixes most common frontend issues | [`frontend/.eslintrc.js`](.frontend/.eslintrc.js) |
| frontend | prettier | Format JS and Typescript code  | [`frontend/.prettierrc`](.frontend/.prettierrc) |
| frontend | Stylelint | Format Styles (css, less, sass)  | [`frontend/.stylelintrc`](.frontend/.stylelintrc) |

Formatters can also be run within the `backend` or `frontend` folders.

### Linting the codebase
or `lint`:

 ```shell
make lint
```

| Section | Tool | Description | Configuration |
| --- | --- | --- | --- |
| backend | Ruff | Checks code formatting, imports sorting  | [`backend/pyproject.toml`](./backend/pyproject.toml) |
| backend | Pyroma | Checks Python package metadata  | -- |
| backend | check-python-versions | Checks Python version information  | -- |
| backend | `zpretty` | Checks XML and ZCML formatting  | -- |
| frontend | ESLint | Checks JS / Typescript lint | [`frontend/.eslintrc.js`](.frontend/.eslintrc.js) |
| frontend | prettier | Check JS / Typescript formatting  | [`frontend/.prettierrc`](.frontend/.prettierrc) |
| frontend | Stylelint | Check Styles (css, less, sass) formatting  | [`frontend/.stylelintrc`](.frontend/.stylelintrc) |

Linters can be run individually within the `backend` or `frontend` folders.

## Internacionalização 🌐

Gere arquivos de tradução para Plone e Volto com facilidade:

```shell
make i18n
```

## Créditos e Agradecimentos 🙏

Criado com carinho usand [Cookieplone (2.0.0b3)](https://github.com/plone/cookieplone) e [cookieplone-templates (a11bbba)](https://github.com/plone/cookieplone-templates/commit/a11bbba152592619ba72bfab9ccc3515425c7484) on 2026-07-23 09:49:43.987533. Um agradecimento especial a todos os colaboradores e apoiadores!
