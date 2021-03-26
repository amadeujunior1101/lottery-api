"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.get("show-user", "User/UserController.show");
  Route.put("update-user", "User/UserController.update").validator(
    "UpdateUser"
  );

  Route.get("list-games", "Game/GameController.index");
  Route.post("create-game", "Game/GameController.store").validator(
    "CreateGame"
  );

  Route.get("index-bet", "Bet/BetController.index");
  Route.post("create-bet", "Bet/BetController.store");
  Route.get("show-bet", "Bet/BetController.show");
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
