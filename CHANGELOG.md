# Alterações

<!-- towncrier release notes start -->
## 2.0.0a2 (2026-08-05)

### Backend


#### Funcionalidade

- Simplifica a rotina `utils.scripts.create_site`: a distribuição e o mapeamento de campos passam a ser resolvidos internamente, dispensando os argumentos `distribution` e `env_options`, agora obsoletos e a serem removidos na versão 2.0.0a3. @ericof [#5](https://github.com/portal-br/intranet/issues/5)



### Frontend

No significant changes.


### Project


#### Correção de Bug

- Move o `dependabot.yml` para `.github/`, onde o Dependabot efetivamente lê a configuração: na raiz o arquivo era inerte e as atualizações semanais das GitHub Actions nunca eram executadas. @ericof [#8](https://github.com/portal-br/intranet/issue/8)


#### Interno

- Simplifica o workflow de verificação do changelog: reutiliza o `config.yml` para calcular os escopos afetados, reduz os quatro jobs a um, reporta todos os escopos pendentes numa única execução e normaliza os caminhos expostos pelo `repoplone` para relativos à raiz do repositório. @ericof [#6](https://github.com/portal-br/intranet/issue/6)
- Corrige a versão do Node usada na geração do Storybook e habilita a publicação no GitHub Pages a partir da `main`, em repositórios públicos. @ericof [#7](https://github.com/portal-br/intranet/issue/7)
- Recomendar o uso da extensão ms-python.vscode-python-envs. @ericof 



## 2.0.0a1 (2026-07-27)

### Backend


#### Breaking

- Atualiza para Plone 6.2.1 e Python 3.14. @ericof 
- Internaliza o `portalbrasil.core` no pacote: criação de site, distribuições, patches de schema, perfis base e utilitários passam a ser mantidos aqui. @ericof 


#### Interno

- Corrige a criação de site e a instalação de dependências após a internalização do core: aponta a distribuição usada nos testes para `portalbrasil-intranet`, move `HiddenProfiles` para `factory.py`, coage `demo_content` via variável de ambiente e ajusta os behaviors dos tipos Person e News Item. @ericof 
- Reorganiza os perfis GenericSetup e o conteúdo de exemplo da distribuição. @ericof 


#### Teste

- Reescreve a suíte de testes do backend para a estrutura internalizada, cobrindo criação de site, autenticação (Authomatic, Keycloak, OIDC), tipos de conteúdo, serviços REST e utilitários, com fixtures anotadas e documentadas. @ericof 



### Frontend

#### Breaking

- Atualiza para Volto 19.3.0 e pnpm 10. @ericof 
- Remove a barra de acessibilidade e os estilos legados substituídos pelo Volto Light Theme. @ericof 

#### Interno

- Migra todo o pacote frontend para TypeScript, removendo `PropTypes`, e substitui o Jest pelo Vitest. @ericof 
- Move as implementações dos componentes customizados (Avatar, Tags, Unauthorized) e da action de vocabulários para o add-on — deixando em `customizations/` apenas shims que reexportam via `@portalbrasil/intranet` — e registra o alias do add-on na configuração do Vitest. @ericof 
- Renderiza os retratos de colaboradores e os avatares com o componente `Image` do Volto no lugar da tag `img` crua. @ericof 



### Project


#### Interno

- Moderniza os workflows de CI, delegando os jobs comuns para `plone/meta@2.x` e removendo a automação local de release. @ericof 
- Regenera a estrutura do projeto a partir do template `project` do cookieplone. @ericof 


#### Documentação

- Ajusta a configuração da documentação: usa a versão de `portalbrasil.intranet`, declara o backend como dependência via `tool.uv.sources` e remove as extensões Sphinx do plone.restapi (httpdomain/httpexample). @ericof 
- Migra a documentação para `docs/docs/` e adiciona verificação de estilo com Vale. @ericof 




## 1.0.0 (2026-07-23)

### Backend


#### Interno

- Fixa o suporte ao Python 3.12 (`requires-python = "==3.12.*"`) e regenera o `uv.lock` com a versão atual do uv. @ericof



### Frontend

#### Interno

- Utiliza `uvx` no lugar de `pipx run` para executar o towncrier durante o processo de release. @ericof



### Projeto


#### Interno

- Atualiza `repository.toml` para o novo formato esperado pelas ferramentas de release e corrige os metadados de `docs/pyproject.toml`, que ainda referenciavam o Volto Light Theme. @ericof



## 1.0.0b3 (2025-04-09)

### Backend


#### Funcionalidade

- Atualiza portalbrasil.core para versão 1.0.0a5 @ericof [#1](https://github.com/portal-br/intranet/issues/1)



### Frontend

#### Funcionalidade

- Atualiza @portalbrasil/core para versão 1.0.0-alpha.5 @ericof [#1](https://github.com/portal-br/intranet/issue/1)



### Projeto

No significant changes.




## 1.0.0b2 (2025-04-09)

### Backend


#### Breaking

- Renomeia pacote para portalbrasil.intranet @ericof


#### Funcionalidade

- Adiciona dependência do portabrasil.core @ericof


#### Interno

- Atualiza versão do Plone para 6.1.1 [@ericof] [#22](https://github.com/portal-br/intranet/issues/22)
- Utiliza versão 1.0.0a4 do portabrasil.core @ericof



### Frontend

#### Breaking

- Renomeia pacote para @portalbrasil/intranet @ericof

#### Funcionalidade

- Dependência do @portalbrasil/core @ericof

#### Interno

- Atualiza configuração do .release-it.json [@ericof] [#14](https://github.com/portal-br/intranet/issue/14)
- Atualiza versão do volto para 18.1.1 [@samoel-silva] [#16](https://github.com/portal-br/intranet/issue/16)
- Atualiza versão do volto para 18.11.0 [@ericof] [#23](https://github.com/portal-br/intranet/issue/23)



### Projeto


#### Interno

- GHA: Adiciona novos templates para issues @ericof
- GHA: Adiciona validação de fragmentos de changelog em cada Pull Request @ericof
- Move o repositório de github.com/plonegovbr/portalbrasil-intranet para github.com/portal-br/intranet @ericof
- Reorganiza o repositório seguindo as melhores práticas da comunidade Plone @ericof




## 1.0.0a4 (2024-10-14)

### Backend

#### Interno

- Atualiza plone.volto (4.4.3) e plone.exportimport(1.0.0a8) [@ericof] #10


#### Documentação

- Altera a geração do label `org.label-schema.docker.cmd` para que ele utilize a tag gerada [@ericof] #9

### Frontend

#### Documentação

- Altera a geração do label `org.label-schema.docker.cmd` para que ele utilize a tag gerada [@ericof] [#9](https://github.com/portal-br/intranet/issue/9)


### Frontend

## 1.0.0a3 (2024-09-27)

### Backend

#### Funcionalidade

- Atualizar Plone para versão 6.0.13 [@ericof] #5

### Frontend
#### Funcionalidade

- Atualizar Volto para 18.0.0-alpha.43 [@ericof] [#6](https://github.com/portal-br/intranet/issue/6)

## 1.0.0a2 (2024-07-24)

### Backend

#### Funcionalidade

- Serializar data de aniversário completa apenas para quem pode editar o conteúdo [@ericof] [#3](https://github.com/portal-br/intranet/issues/3)

### Frontend

#### Funcionalidade

- Habilita VLibras por padrão em todas as páginas da Intranet [@ericof] [#1](https://github.com/portal-br/intranet/issue/1)
- Suporte a exibição do mapa do site no rodapé [@ericof] [#2](https://github.com/portal-br/intranet/issue/2)
- Exibe data de aniversário de um colaborador [@ericof] [#3](https://github.com/portal-br/intranet/issue/3)

## 1.0.0a1 (2024-07-10)

### Backend

#### Funcionalidade

- Implementação inicial do PortalBrasil: Intranet [@ericof]

### Frontend

#### Funcionalidade

- Implementação inicial do PortalBrasil: Intranet [@ericof]
