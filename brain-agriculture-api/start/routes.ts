/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/list', 'ProdutorRuralController.list')
  Route.post('/register', 'ProdutorRuralController.register')
  Route.get('/:id', 'ProdutorRuralController.show')
  Route.put('/:id', 'ProdutorRuralController.update')
}).prefix('/produtor-rural')

Route.group(() => {
  Route.get('/list', 'CulturaController.list')
}).prefix('/culturas')


Route.group(() => {
  Route.get('/total-fazendas', 'DashboardController.totalFazendas')
  Route.get('/total-hectares', 'DashboardController.totalHectares')
}).prefix('/dashboard')



