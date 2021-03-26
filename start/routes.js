"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.get("list-users", "User/UserController.index");
  Route.get("show-user", "User/UserController.show");
  Route.put("update-user", "User/UserController.update").validator(
    "UpdateUser"
  );
  Route.delete("delete-user", "User/UserController.delete");

  Route.get("list-games", "Game/GameController.index");
  Route.get("show-game", "Game/GameController.show");
  Route.post("create-game", "Game/GameController.store").validator(
    "CreateGame"
  );
  Route.put("update-game", "Game/GameController.update").validator(
    "UpdateGame"
  );
  Route.delete("delete-game", "Game/GameController.delete");

  Route.get("index-bet", "Bet/BetController.index");
  Route.post("create-bet", "Bet/BetController.store");
  Route.get("show-bet", "Bet/BetController.show");
  Route.put("update-bet", "Bet/BetController.update");
  Route.delete("delete-bet", "Bet/BetController.delete");
}).middleware(["auth"]);

Route.group(() => {
  Route.post("create-users", "User/UserController.store").validator(
    "CreateUser"
  );

  Route.post("confirmation-user", "Confirmation/ConfirmationController.store");
  Route.post(
    "confirmation-forgot-password",
    "Confirmation/ConfirmationController.forgot_password"
  );
  Route.post(
    "confirmation-reset-password",
    "Confirmation/ConfirmationController.reset_password"
  );
  Route.post("auth", "Auth/AuthController.store");
  Route.post("token-check", "Auth/AuthController.token_check");
}).middleware(["guest"]);
