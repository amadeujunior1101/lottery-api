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

      // return gameObj

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

  async show({ request, params, response, auth, Headers }) {
    try {
      const { game_id } = request.only(["game_id"]);
      if (!game_id)
        return response.status(200).json({
          type: "info",
          message: "Enter the game id parameters.",
          user_message: "Informe o parametro de game id.",
          data: [],
        });

      const game = await Game.query().where("id", game_id).fetch();
      let convert_games = game.toJSON();

      if (convert_games.length === 0)
        return response.status(200).json({
          type: "info",
          message: "Game not found.",
          user_message: "Game não encontrado.",
          data: [],
        });

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

  async update({ request, response }) {
    try {
      const gameObj = request.only([
        "game_id",
        "type",
        "description",
        "range",
        "price",
        "max_number",
        "color",
        "min_cart_value",
      ]);

      if (!gameObj.game_id)
        return response.status(200).json({
          type: "info",
          message: "Enter the game id parameters.",
          user_message: "Informe o parametro de game id.",
          data: [],
        });

      let game_updated = await Game.query()
        .where("id", gameObj.game_id)
        .update({
          type: gameObj.type,
          description: gameObj.description,
          range: gameObj.range,
          price: gameObj.price,
          max_number: gameObj.max_number,
          color: gameObj.color,
          min_cart_value: gameObj.min_cart_value,
        });

      if (game_updated === 0) {
        return response.status(200).json({
          type: "success",
          message: "game not found.",
          user_message: "Game não encontrado.",
          data: [],
        });
      } else {
        return response.status(200).json({
          type: "success",
          message: "Game updated successfully.",
          user_message: "Game atualizado com sucesso.",
          data: [],
        });
      }
    } catch (error) {
      return response.status(503).json({
        type: "error",
        error: error.toString(),
      });
    }
  }

  async delete({ auth, request, response }) {
    try {
      const gameObj = request.only(["game_id"]);

      if (!gameObj.game_id)
        return response.status(200).json({
          type: "info",
          message: "Enter the game id parameters.",
          user_message: "Informe o parametro de game id.",
          data: [],
        });

      let game_deleted = await Game.query()
        .where("id", gameObj.game_id)
        .delete();

      if (game_deleted === 0) {
        return response.status(200).json({
          type: "success",
          message: "game not found.",
          user_message: "Game não encontrado.",
          data: [],
        });
      } else {
        return response.status(200).json({
          type: "success",
          message: "Game deleted successfully.",
          user_message: "Game removido com sucesso.",
          data: [],
        });
      }
    } catch (error) {
      return response.status(503).json({
        type: "error",
        error: "Game não pode ser removido porque faz referencia a tabela Bets",
      });
    }
  }
}

module.exports = GameController;
