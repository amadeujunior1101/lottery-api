"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.post("create-users", "User/UserController.store").validator(
    "CreateUser"
  );
  Route.put("update-user", "User/UserController.update")

  Route.post("confirmation-user", "Confirmation/ConfirmationController.store");
  Route.post(
    "confirmation-forgot-password",
    "Confirmation/ConfirmationController.forgot_password"
  );
  Route.post(
    "confirmation-reset-password",
    "Confirmation/ConfirmationController.reset_password"
  );

  Route.get("list-games", "Game/GameController.index");
  Route.post("create-game", "Game/GameController.store").validator(
    "CreateGame"
  );

  Route.get("index-bet", "Bet/BetController.index");
  Route.post("create-bet", "Bet/BetController.store");
  Route.get("show-bet", "Bet/BetController.show");

  Route.post("auth", "Auth/AuthController.store");
  Route.post("token-check", "Auth/AuthController.token_check");

  // Route.resource("users", "UserController").apiOnly();
}); //.middleware(['auth'])
