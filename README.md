![sanduíche ou não](https://i.imgur.com/bI6VXQo.png)  
# É um sanduíche ou não?

Utilizando o poder do voto para solucionar o dilema se tal comida é ou não um **SANDUÍCHE**!

# Contribuindo

Esse projeto foi desenvolvido só por diversão, e para permitir contribuições no Hacktoberfest!

[Dê uma olhada nas issues caso queira contribuir!](https://github.com/tancredosouza/is_sandwich/issues). **Lembre-se de fazer um fork do repositório!**

Os arquivos no qual você vai mexer caso deseje contribuir são `src/index.js` (Javascript do Backend) e `src/front.js` (Javascript do Frontend).

Os arquivos `index.html` e `src\index.css` são arquivos estáticos apresentados no navegador do usuário. Você provavelmente não vai precisar mexer neles.

## Como executar o projeto

### Frontend

Pra executar o frontend localmente, basta abrir o arquivo `index.html` em seu navegador e o front-end irá ser iniciado!

Eu gosto de utilizar a ferramenta [`browser-sync`](https://browsersync.io/) pra que mudanças no `src/index.css` ou `src/front.js` apareçam automaticamente em meu browser.

O frontend está deployed no Netlifly.

### Backend

O backend está sendo executado no Heroku, e se comunica com um banco de dados hospedado no MongoDB.

Para executar o backend localmente, será necesário primeiro criar um [banco de dados local utilizando o MongoDB](https://automattic.github.io/monk/docs/GETTING_STARTED.html), e alterar o seguinte segmento de código para conectar com seu novo banco de dados local:

```JS
// (...)
const url = `localhost:${PORTA_DO_SEU_DB_LOCAL}`;
const db = monk(url);
db.then(() => console.log("Connected with server!"));
// (...)
```

Para executar o backend, da raiz do repositório:

```
> npm install
> cd src
> node index.js
```

Seu backend deve dizer algo como:

```
Listening at http://localhost:5000!
```

Então basta só alterar o código no frontend `src/front.js` para se conectar ao seu novo backend local!

```JS
function sendToServer() {
  alert("Aguarde um momento! Adicionando seu voto...");
  fetch("http://localhost:5000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  })
  //(...)
}
```

Pronto! Você tem uma versão local do projeto executando localmente!
