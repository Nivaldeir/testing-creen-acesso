📄 Desafio Técnico Backend NodeJS
Este projeto é uma solução para o desafio técnico proposto pela Green Acesso, que consiste em importar dados de arquivos .csv e .pdf, processá-los e exportar informações em formato .pdf.

🚀 Tecnologias Utilizadas
Node.js com TypeScript

Express para a criação da API

Prisma ORM com banco de dados SQL (por exemplo: PostgreSQL ou SQLite)

pdf-lib para manipulação de arquivos PDF

Multer para upload de arquivos

dotenv para gerenciamento de variáveis de ambiente

📦 Instalação
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
Instale as dependências:

bash
Copiar
Editar
npm install
Configure as variáveis de ambiente no arquivo .env:

env
Copiar
Editar
DATABASE_URL="sua_string_de_conexão"
Execute as migrações do banco de dados:

bash
Copiar
Editar
npx prisma migrate dev --name init
Inicie o servidor:

bash
Copiar
Editar
npm run dev
📁 Estrutura do Projeto
src/

controllers/ – Controladores das rotas da API

usecases/ – Casos de uso da aplicação

repositories/ – Implementações dos repositórios

services/ – Serviços auxiliares (por exemplo: geração de PDF)

prisma/ – Configurações do Prisma ORM

routes/ – Definição das rotas da API

📄 Funcionalidades
1. Importação de CSV
Endpoint: POST /boletos/import

Recebe um arquivo .csv contendo informações de boletos.

Processa e armazena os dados no banco de dados.

2. Separação de PDF
Endpoint: POST /boletos/separar-pdf

Recebe um arquivo .pdf com múltiplas páginas.

Separa cada página em arquivos individuais e os salva em um diretório específico.

3. Geração de Relatório em PDF
Endpoint: GET /boletos?relatorio=1

Gera um arquivo .pdf contendo os boletos cadastrados.

Retorna o arquivo em formato base64.

🧪 Testes
Para executar os testes (se implementados):

bash
Copiar
Editar
npm run test
📝 Considerações
O projeto segue os princípios de Clean Architecture, separando responsabilidades entre camadas.

O código é modular e fácil de manter, facilitando futuras extensões.