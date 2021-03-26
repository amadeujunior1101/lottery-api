"use strict";

const Game = use("App/Models/Game");

class GameController {
  async index({ request, response }) {
    try {
      const { page, limit } = request.only(["page", "limit"]);

      if (!page || !limit)
        return response.status(200).json({
          type: "info",
          message: "Enter the page and limit parameters.",
          user_message: "Informe os parametros de pagina e limite.",
          data: [],
        });

      const game = await Game.query().paginate(page, limit);
      let convert_games = game.toJSON();

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
        message: "Game successfully registered.",
        user_message: "Jogo cadastrado com sucesso.",
        data: [],
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        message: "exception found",
        user_message: "Desculpe-nos, houve um problema",
        data: { error: error.toString() },
      });
    }
  }
}

module.exports = GameController;
