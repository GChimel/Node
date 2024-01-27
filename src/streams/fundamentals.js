/* 
  - Ler / Obter pequenas partes de alguma coisa e já conseguir trabalhar com os dados sem necessáriamente 
    carregar por completo

  - O node por padrão irá ler todo o arquivo e depois percorrer todo o arquivo para realizar as operações
    Com a stream você consegue ler as partes do arquivo e processar enquanto o arquivo estiver sendo lido  

  - Tipos de Stream: Redable Steam / Writeable Steam

  - Dentro de Stream não podem ser formato primitivo. exemplo: Array, String, Number etc..
    Precisamos transforma-los para o formato de buffer.

*/

//  Tudo que eu estou recebendo como entrada (stdin) eu estou encaminhando (pipe) para uma saida (stdout)
//  -> process.stdin.pipe(process.stdout)

//  Criando uma stream do zero Readable ->
import { Readable, Transform, Writable } from 'node:stream';

class OneToHundredStream extends Readable {
  
  index = 1;

  // Esse método vai retornar os dados dessa steam
  _read() {
    const i = this.index++;

    if(i > 100) {
      // push é o método que vai colocar os dados na stream
      this.push(null);
    } else {
      // Buffer.from transforma um dado em buffer
      const buf = Buffer.from(String(i))

      this.push(buf)
    }

  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    // Primeiro paramentro do callback é o erro e o segundo paramentro é o dado transformado
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {

  // chunk é o dado que estou recebendo
  // encoding é o formato do dado que estou recebendo
  // callback é uma função que vai ser executada quando terminar o processo
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString() * 10))
    callback()
  }
    
}


// Estou lendo a steam e enquanto eu estiver lendo eu estou escrevendo no terminal.
new OneToHundredStream()
  // .pipe(process.stdout) -> Primeira Stream
  .pipe(new InverseNumberStream()) /* Obrigatoriamente precisa ler a stream e depois escrever em outro lugar. */
  .pipe(new MultiplyByTenStream())