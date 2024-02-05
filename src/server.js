import http from 'http';
import { json } from './middlewares/json.js';

/* 
  HTTP 
  Metodos HTTP: GET, POST, PUT, PATCH, DELETE
  
  GET: Buscar uma informação no back-end
  POST: Criar uma informação no back-end
  PUT: Alterar uma informação no back-end
  PATCH: Alterar uma informação específica no back-end
  DELETE: Deletar uma informação no back-end
*/

/*
  Aplicação: Stateful - Stateless

  Stateful: Sempre salva algum tipo de informação em memória. e depende disso para funcionar

  Stateless: Não salva nada em memória, sempre salva em banco de dados ou arquivos texto etc..

*/ 


/* 
  Cabeçalhos (Requisição/Resposta) => Metadados

  setHeader: Define o cabeçalho da resposta HTTP

*/

const users = [];

// recebe dois parametros: request e response (req e res)
const server = http.createServer(async(req, res) => {
  const { method, url } = req;

  await json(req, res);

  //  se o método for GET e a url for /users retorna a listagem de usuários
  if (method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify(users))
  }
  
  // se o método for POST e a url for /users retorna a criação de usuário
  if (method === 'POST' && url === '/users') {

    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email,
    })

    // 201: Created 
    return res.writeHead(201).end();
  }

  // se não for nenhum desses:
  // 404: Not Found
  return res.writeHead(404).end();

});

//  server.listen significa que o servidor vai ficar ouvindo a porta 3333 (localhost:3333)
server.listen(3333)