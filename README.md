# Projeto:  Register Drivers

Plataforma para cadastrar motoristas de todo o Brasil.

****
## *Sobre o projeto* ⭐️
### *Principais funcionalidades:*

- Listar motoristas já cadastrados com os dados dos motoristas, nessa listagem podemos editar um motorista, cadastrar um novo motorista e inativar um motorista.
- Dados do cadastro: Nome, telefone, data de nascimento, CNH, tipo de CNH e CPF.

### *Tecnologias usadas:*

- [React](https://pt-br.reactjs.org/docs/getting-started.html);
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start);
- [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html);
- [Ant Design](https://ant.design/docs/react/introduce);
- [Sass](https://sass-lang.com/documentation);
- [Font Awesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react);
- [Json Server](https://github.com/typicode/json-server);
- [Jest](https://jestjs.io/en/);

****
## *Como instalar e rodar ?* 🚀
###  *Pré-requisitos:*
1. Ter o **[Node js](https://nodejs.org/en/) instalado** e junto dele a **[NPM](https://www.npmjs.com/)**;

2. **Clonar o repositório** em sua máquina, usando comando abaixo em seu terminal:

```
  git clone https://github.com/oliviaresende/register-drivers.git
```

3. Agora basta **instalar as dependências** do seu projeto, digitando no terminal:

```
  npm install
```

4. E por ultimo dar o comando para **rodar** seu projeto:

```
  npm start
```

 > *Obs: O projeto irá abrir em seu navegador, rodando no http://localhost:3000*

 ****

 ### Como funciona Json-server ? 🚀

Baseado em um único json que contém **events, lectures e profile**. Pode-se efetuar o GET,POST e PUT. Basta apenas escrever **http://localhost:3001/drivers**, como por exemplo.

> *Obs.: Ao rodar o projeto, ele irá criar uma API fake em **http://localhost:3001/** e o front **http://localhost:3000/***

*Exemplo:*

Request | URL | Detalhes
-- | -- | --
GET | /drivers | Busca todos os motoristas
GET | /drivers/1 | Busca um motorista
POST | /drivers | Salvar um motorista
PUT | /drivers/1 | Editar os dados do motorista