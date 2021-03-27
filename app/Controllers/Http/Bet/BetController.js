"use strict";

const Bet = use("App/Models/Bet");
const Mail = use("Mail");

class BetController {
  async index({ request, response }) {
    try {
      const bet = await Bet.query().fetch();

      let convert_bets = bet.toJSON();

      // convert_bets.data

      return response.status(200).json({
        type: "success",
        status_code: 200,
        message: "Bets found.",
        user_message: "Apostas encontradas.",
        data: convert_bets,
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

  async store({ request, response, auth }) {
    try {
      const user = auth.user;
      const betObj = request.only(["date", "games"]);

      for (let index = 0; index < betObj.games.length; index++) {
        await Bet.create({
          date: betObj.date,
          numbers: betObj.games[index].numbers,
          game_id: betObj.games[index].game_id,
          user_id: user.id,
        });
      }

      const bet = await Bet.query()
        .with("user", (builder) => {
          builder.setVisible(["id", "full_name"]);
        })
        .with("game", (builder) => {
          builder.setVisible(["id", "type", "color", "price"]);
        })
        .where("user_id", user.id)
        .setHidden(["user_id", "game_id", "created_at", "updated_at"])
        .fetch();

      let convert_bets = bet.toJSON();

      var total = convert_bets.reduce(
        (accumulator, currentValue) => {
          return Number(accumulator) + currentValue.game.price;
        },
        [0]
      );

      let arrGames = [];

      convert_bets.map((item, index) => {
        convert_bets[index];
        const { id, price, date, numbers, user, game } = item;
        let converted_bets = numbers.split(", ");
        return arrGames.push({
          id: item.id,
          type: game.type,
          color: game.color,
          price: game.price,
          date: date,
          numbers: converted_bets,
        });
      });

      let dataEmail = [
        {
          full_name: user.full_name,
          games: arrGames,
          total: total,
        },
      ];

      await Mail.send(["emails.historic-bet"], dataEmail[0], (message) => {
        message
          .to(user.email)
          .from("contato@deliveryserver.com.br")
          .subject("Histórico de aposta");
      });

      return response.status(200).json({
        type: "success",
        status_code: 200,
        message: "Bet successfully registered.",
        user_message: "Aposta cadastrado com sucesso.",
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

  async show({ request, response, auth }) {
    try {
      const user = auth.user;

      const bet = await Bet.query()
        .with("user", (builder) => {
          builder.setVisible(["id", "full_name"]);
        })
        .with("game", (builder) => {
          builder.setVisible(["id", "type", "color", "price"]);
        })
        .where("user_id", user.id)
        .setHidden(["user_id", "game_id", "created_at", "updated_at"])
        .fetch();

      let convert_bets = bet.toJSON();

      let arrGames = [];

      convert_bets.map((item, index) => {
        // convert_bets[index];
        const { id, price, date, numbers, user, game } = item;

        // total = game.reduce(getTotal, 0);
        // function getTotal(total, item) {
        //   return total + item.price * item.quantity;
        // }

        let converted_bets = numbers.split(", ");
        return arrGames.push({
          id: item.id,
          type: game.type,
          color: game.color,
          price: game.price,
          date: date,
          numbers: converted_bets,
        });
      });
      // return arrGames;

      if (convert_bets.length === 0)
        return response.status(200).json({
          type: "info",
          status_code: 200,
          message: "No bets found.",
          user_message: "Nenhuma aposta encontrada.",
          data: [],
        });
      // const {bet} = convert_bets

      return response.status(200).json({
        type: "success",
        message: "Bets found.",
        user_message: "Apostas encontradas.",
        data: arrGames,
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

  async update({ request, response, auth }) {
    try {
      const user = auth.user;
      const betObj = request.only(["games"]);

      if (!betObj)
        return response.status(200).json({
          type: "info",
          message: "Enter the game array.",
          user_message: "Informe o array de games.",
          data: [],
        });

      let bet_updated;

      let betResult = await Bet.query().where("user_id", user.id).fetch();

      const betResultConverted = betResult.toJSON();

      for (let index = 0; index < betObj.games.length; index++) {
        betResultConverted;
        bet_updated = await Bet.query()
          .where("id", betResultConverted[index].id)
          .update({
            user_id: user.id,
            game_id: betObj.games[index].game_id,
            numbers: betObj.games[index].numbers,
          });

        // return bet_updated;
      }

      // let game_updated = await Bet.query().where("id", gameObj.game_id).update({
      //   game_id: 1,
      //   numbers: "",
      // });

      if (bet_updated === 0) {
        return response.status(200).json({
          type: "success",
          message: "Bet not found.",
          user_message: "Bet não encontrado.",
          data: [],
        });
      } else {
        return response.status(200).json({
          type: "success",
          message: "Bet updated successfully.",
          user_message: "Aposta atualizado com sucesso.",
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
      const user = auth.user;

      let bet_all = await Bet.query().where("user_id", user.id).fetch();

      const betAllConverted = bet_all.toJSON();

      let bet_delete;
      for (let index = 0; index < betAllConverted.length; index++) {
        bet_delete = await Bet.query()
          .where("id", betAllConverted[index].id)
          .delete();
      }

      if (bet_delete === 0) {
        return response.status(200).json({
          type: "success",
          message: "bet not found.",
          user_message: "Aposta não encontrado.",
          data: [],
        });
      } else {
        return response.status(200).json({
          type: "success",
          message: "Bet deleted successfully.",
          user_message: "Aposta(s) removida(s) com sucesso.",
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
}

module.exports = BetController;
