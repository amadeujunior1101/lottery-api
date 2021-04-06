"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token");
const Mail = use("Mail");
const Hash = use("Hash");
const CryptoRandomString = require("crypto-random-string");
const Env = use("Env");

class ConfirmationController {
  async store({ request, response, params, view }) {
    const { token } = request.get();

    const checkToken = await User.findBy("reset_password", token);

    if (!checkToken)
      return response.status(200).json({
        type: "success",
        status_code: 200,
        message: "Token invalid.",
        user_message: "Token invalido.",
        data: [],
      });

    await checkToken.save();

    return response.status(200).json({
      type: "success",
      status_code: 200,
      message: "Token valid.",
      user_message: "Token valido.",
      data: checkToken,
    });
  }

  async forgot_password({ request, response, auth }) {
    try {
      const obj = request.only(["email"]);

      const user = await User.query().where("email", obj.email).fetch();
      let user_converted = user.toJSON();

      if (user_converted.length > 0) {
        let objBody = {
          name: user_converted[0].full_name,
          token: CryptoRandomString({
            length: 50,
            type: "url-safe",
          }),
        };
        await Mail.send("emails.forgot-password", objBody, (message) => {
          message.from(Env.get("MAIL_USERNAME"));
          message.subject("Redefinição de senha"), message.to(obj.email);
        });
        await User.query().where("id", user_converted[0].id).update({
          reset_password: objBody.token,
        });

        return response.status(200).json({
          type: "success",
          status_code: 200,
          message: "Email successfully sent.",
          user_message: "Email enviado com sucesso.",
          data: [],
        });
      }

      return response.status(201).json({
        type: "success",
        status_code: 201,
        message: "Email not registered.",
        user_message: "Email não cadastrado.",
        data: [],
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        status_code: 503,
        message: "exception found",
        user_message: "Desculpe-nos, houve um problema",
        data: error.toString(),
      });
    }
  }

  async reset_password({ request, response, auth }) {
    try {
      const { token, password } = request.only(["token", "password"]);

      if (!token || !password)
        return response.status(201).json({
          type: "info",
          status_code: 201,
          message: "required Token and password",
          user_message: "Os parâmetros token e password devem ser passados.",
          data: [],
        });

      const user = await User.findBy("reset_password", token);

      if (user !== null) {
        await User.query()
          .where("id", user.id)
          .update({
            password: await Hash.make(password),
            reset_password: "",
          });

        return response.status(200).json({
          type: "success",
          status_code: 200,
          message: "Password successfully reset.",
          user_message: "Senha redefinida com sucesso.",
          data: [],
        });
      }

      return response.status(201).json({
        type: "success",
        status_code: 201,
        message: "Email successfully sent.",
        user_message: "Token invalido.",
        data: [],
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        status_code: 503,
        message: "exception found",
        user_message: "Desculpe-nos, houve um problema",
        data: error.toString(),
      });
    }
  }

}

module.exports = ConfirmationController;
