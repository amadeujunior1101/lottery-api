'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('auth', 'AuthController.store')

Route.post('create-users', 'User/UserController.store')
Route.get('register/confirm/:token', 'ConfirmUserController.edit')
Route.put('confirm-user/:token', 'ConfirmUserController.update')

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()
})//.middleware(['auth'])

