"use strict";

const Game = use("App/Models/Game");

class GameController {
  // paginação index
  async index({ request, response }) {
    try {
      const game = await Game.query().fetch();
      // await user.load('profile')
      let convert_games = game.toJSON();

      // convert_bets.data

      return response.status(200).json({
        type: "success",
        data: convert_games,
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        data: { error: error.toString() },
      });
    }
  }

  async store({ request, response }) {
    try {
      const gameObj = request.only([
        "type",
        "description",
        "range",
        "price",
        "max_number",
        "color",
        "min_cart_value",
      ]);

      //  return gameObj

      await Game.create(gameObj);

      return response.status(200).json({
        type: "success",
        status_code: 200,
        message: "Game successfully registered.",
        user_message: "Jogo cadastrado com sucesso.",
        data: [],
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        status_code: 503,
        message: "exception found",
        user_message: "Desculpe-nos, houve um problema",
        data: { error: error.toString() },
      });
    }
  }
}

module.exports = GameController;
