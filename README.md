# Drawback.docs

<p align="center">
    <img loading="lazy" src="http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=GREEN&style=for-the-badge" alt="badge"/>
</p>

## Resumo do projeto

Projeto em desenvolvimento para a conclusão do curso Técnico de Desenvolvimento de Sistemas na ETEC Professor Camargo Aranha. É um sistema com o fim de auxiliar os empreendedores, principalmente brasileiros, em relação a gestão da validade de seus Documentos para receber o benefício tributário Drawback. Permite a criação de 3 tipos de usuários, Pessoa Física, Pessoa Jurídica e Funcionários, o terceiro tipo pode se vincular a uma Pessoa Jurídica para ter acesso aos Documentos da empresa.


## 🔨 Funcionalidades do projeto

- `Funcionalidade 1` `CRUD dos Documentos`: É possível inserir novos documentos, fazer download deles, atualiza-los e também excluir, é feita uma exclusão lógica dos documentos;
- `Funcionalidade 2` `Criação, vinculação e exclusão de Usuários`: É possível criar um novo usuário, se vincular a um outro usuário para ter ascesso aos documentos dele (caso ele permita), e excluir o seu usuário, é feita uma exclusão lógica;
- `Funcionalidade 3` `Gerenciamento de permissões dos Usuários`: Caso o usuário tenha se vinculado a outro, as permissões desse usuário são alteradas e ele apenas pode consultar os documentos, sem poder fazer criação, deleção ou atualização deles;

## ✔️ Técnicas e Tecnologias Utilizadas

<p align="center">
  <img loading="lazy" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img loading="lazy" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
  <img loading="lazy" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
</p>

## 🎲 Pré-requisitos 

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com) 
- [Java](https://www.oracle.com/br/java/technologies/downloads/) 
- [VSCode](https://code.visualstudio.com/)
- [IntelliJ](https://www.jetbrains.com/idea/) ou [Eclipse](https://www.eclipse.org/)
- [MySQL](https://www.mysql.com/)

## 👾 Preparando o Back End (GED API)

### Clonando a API (GED API)

```bash
# Clone este repositório
$ git clone https://github.com/DaviMunhoz1005/GedApi
```

- Abra o projeto com o IntelliJ ou Eclipse;
- Entre na pasta Resource e abra o arquivo application.yaml;
- Modifique o atributo database.username e database.password para se adequar as configurações do seu Banco de Dados;

### Configuração do Banco de Dados (MySQL)

```sql
# Insira o seguinte comando no console
CREATE DATABASE api_files;
```

- Após isso start a API;

```sql
# Insira os seguintes comandos no console
INSERT INTO tb_roles (id, description, role_name) 
VALUES (1, "client adm", 'CLIENT');
INSERT INTO tb_roles (id, description, role_name) 
VALUES (2, "employee", 'EMPLOYEE');
```

## Preparando o Front End (Drawback.docs)

```bash
# Clone este repositório
$ git clone https://github.com/DaviMunhoz1005/Drawback.docs
```

- Abra ele no VS Code;
- Instale a extensão Live Server;
- Acesse o arquivo <i>index.html</i> pelo Live Server;