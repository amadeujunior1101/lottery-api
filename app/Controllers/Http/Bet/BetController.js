"use strict";

const Bet = use("App/Models/Bet");

class BetController {
  async index({ request, response }) {
    try {
      const bet = await Bet.query().fetch();
      // await user.load('profile')
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

  async store({ request, response }) {
    try {
      const betObj = request.all();
      //   "type",
      //   "price",
      //   "date",
      //   "color",
      //   "bets",
      //   "user_id"
      // ]);

      // return betObj.games[0]

      await betObj.games.map((item, index) => {
        Bet.create({
          type: item.type,
          price: item.price,
          date: item.date,
          color: item.color,
          bets: item.bets,
          user_id: betObj.user_id,
        });
      });

      // await Bet.create(betObj);

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
}

module.exports = BetController;
