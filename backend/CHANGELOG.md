# Alterações

<!-- towncrier release notes start -->

## 2.0.0a3 (2026-08-26)


### Funcionalidade

- Adiciona `sc.voltolighttheme` como dependência no backend da Intranet, permitindo o carregamento dos estilos e customizações no Plone. @humanaice [#11](https://github.com/portal-br/intranet/issues/11)
- Atualiza `sc-voltolighttheme` para 1.0.0a5, substituindo `kitconcept.voltolighttheme` por `sc.voltolighttheme` nas dependências do site, adotando os perfis `default` e `intranet`, revisando os behaviors do Plone Site e adicionando o passo de upgrade `20260824001`. @ericof [#13](https://github.com/portal-br/intranet/issues/13)

## 2.0.0a2 (2026-08-05)


### Funcionalidade

- Simplifica a rotina `utils.scripts.create_site`: a distribuição e o mapeamento de campos passam a ser resolvidos internamente, dispensando os argumentos `distribution` e `env_options`, agora obsoletos e a serem removidos na versão 2.0.0a3. @ericof [#5](https://github.com/portal-br/intranet/issues/5)

## 2.0.0a1 (2026-07-27)


### Breaking

- Atualiza para Plone 6.2.1 e Python 3.14. @ericof 
- Internaliza o `portalbrasil.core` no pacote: criação de site, distribuições, patches de schema, perfis base e utilitários passam a ser mantidos aqui. @ericof 


### Interno

- Corrige a criação de site e a instalação de dependências após a internalização do core: aponta a distribuição usada nos testes para `portalbrasil-intranet`, move `HiddenProfiles` para `factory.py`, coage `demo_content` via variável de ambiente e ajusta os behaviors dos tipos Person e News Item. @ericof 
- Reorganiza os perfis GenericSetup e o conteúdo de exemplo da distribuição. @ericof 


### Teste

- Reescreve a suíte de testes do backend para a estrutura internalizada, cobrindo criação de site, autenticação (Authomatic, Keycloak, OIDC), tipos de conteúdo, serviços REST e utilitários, com fixtures anotadas e documentadas. @ericof 

## 1.0.0 (2026-07-23)


### Interno

- Fixa o suporte ao Python 3.12 (`requires-python = "==3.12.*"`) e regenera o `uv.lock` com a versão atual do uv. @ericof

## 1.0.0b3 (2025-04-09)


### Funcionalidade

- Atualiza portalbrasil.core para versão 1.0.0a5 @ericof [#1](https://github.com/portal-br/intranet/issues/1)

## 1.0.0b2 (2025-04-09)


### Breaking

- Renomeia pacote para portalbrasil.intranet @ericof


### Funcionalidade

- Adiciona dependência do portabrasil.core @ericof


### Interno

- Atualiza versão do Plone para 6.1.1 [@ericof] [#22](https://github.com/portal-br/intranet/issues/22)
- Utiliza versão 1.0.0a4 do portabrasil.core @ericof

## 1.0.0a4 (2024-10-14)


### Interno

- Atualiza plone.volto (4.4.3) e plone.exportimport(1.0.0a8) [@ericof] #10


### Documentação

- Altera a geração do label `org.label-schema.docker.cmd` para que ele utilize a tag gerada [@ericof] #9

## 1.0.0a3 (2024-09-27)


### Funcionalidade

- Atualizar Plone para versão 6.0.13 [@ericof] #5

## 1.0.0a2 (2024-07-24)

### Features

- Serializar data de aniversário completa apenas para quem pode editar o conteúdo [@ericof] [#3](https://github.com/portal-br/intranet/issues/3)


## 1.0.0a1 (2024-07-10)

- Implementação inicial do PortalBrasil: Intranet [@ericof]
