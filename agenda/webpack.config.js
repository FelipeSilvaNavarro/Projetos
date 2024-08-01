/**
 * Configuração do Webpack para empacotar os arquivos JavaScript da aplicação.
 * Define o modo de produção, o ponto de entrada, o local de saída do bundle,
 * as regras para a transformação dos arquivos JavaScript com Babel, e a geração do source map.
 */

const path = require('path')

module.exports = {
  mode: 'production', // Define o modo de produção para otimizar o código final
  entry: './frontend/main.js', // Arquivo de entrada que será empacotado pelo Webpack
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'), // Diretório de saída do bundle gerado
    filename: 'bundle.js' // Nome do arquivo de saída
  },
  module: {
    rules: [
      {
        exclude: /node_modules/, // Exclui a pasta node_modules da transpilação
        test: /\.js$/, // Aplica a regra a todos os arquivos .js
        use: {
          loader: 'babel-loader', // Utiliza o Babel para transpilar o código
          options: {
            presets: ['@babel/env'] // Define o preset do Babel para o ambiente atual
          }
        }
      }
    ]
  },
  devtool: 'source-map' // Gera um source map para facilitar o <debugging></debugging>
}
