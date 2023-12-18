# Brain Agriculture

Este guia fornece instruções passo a passo para a instalação e execução do projeto "Brain Agriculture". O projeto é dividido em três componentes principais: Banco de Dados, API e Front-End. Abra três terminais e siga as instruções em cada um, respeitando a ordem estabelecida.

## Pré-Requisitos
- Docker
- Node.js 20
- npm (Node Package Manager)

## Instalação e Execução
Abra 3 terminais em cada terminal siga as instruções na ordem estabecida

### Passo 1: Banco de Dados
#### Preparar o Banco de Dados:
```bash
cd brain-agriculture-infrastructure

# Construir a imagem do banco de dados com usuario brain-agriculture-api comfigurado
docker build -t brain-agriculture-db-image .

# Executar a imagem
docker run --name brain-agriculture-db-instance -p 5432:5432 -d brain-agriculture-db-image
```
Após esses comandos, prossiga para o Passo 2.

### Passo 2: API
#### Configurar e Iniciar a API:
```bash
cd brain-agriculture-api
npm install

# Criar as estruturas do banco de dados
node ace migration:run

# Semear base de dados para aprensentação do teste
node ace db:seed

# Executar em modo desenvolvimento
npm run dev
```
Com a API em execução, vá para o Passo 3.

### Passo 3: Front-End
#### Configurar e Executar o Front-End:
```bash
cd brain-agriculture-front-end
npm install

# Executar em modo desenvolvimento
npm run dev

```
Após executar estes comandos, abra o navegador e acesse http://localhost:3000.
Siga estas etapas para configurar o ambiente de desenvolvimento do "Brain Agriculture". Se encontrar problemas durante a instalação ou execução, verifique se todos os pré-requisitos estão instalados corretamente.

