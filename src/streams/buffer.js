// buffer é uma representação de um espaço na memória do computador que são usados para armazenar dados
// que podem ser processados rapidamente (são salvos em binario)

const buf = Buffer.from('OK');

console.log(buf) //retorna <Buffer 4f 4b> que é um exadecimal que representa as letras O e K

console.log(buf.toJSON()) //retorna em decimal.

