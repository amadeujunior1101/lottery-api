"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("create-users", "User/UserController.store").validator("CreateUser");
Route.post("create-game", "Game/GameController.store").validator("CreateGame");

Route.get("index-bet", "Bet/BetController.index")
Route.post("create-bet", "Bet/BetController.store")
Route.get("show-bet", "Bet/BetController.show")

Route.post("auth", "Auth/AuthController.store");

Route.get("register/confirm/:token", "ConfirmUserController.edit");
Route.put("confirm-user/:token", "ConfirmUserController.update");

Route.group(() => {
  Route.resource("users", "UserController").apiOnly();
}); //.middleware(['auth'])
