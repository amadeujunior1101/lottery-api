"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token");

class AuthController {
  async store({ request, response, auth }) {
    try {
      const userObj = request.only(["email", "password"]);

      if (!userObj.email || !userObj.password)
        return response.status(201).json({
          type: "info",
          status_code: 201,
          message: "Enter the fields for authentication.",
          user_message: "Informe os campos para a autenticação.",
          data: [],
        });

      let emailResult = userObj.email.replace(/\s/g, "");

      const userCheckToken = await User.query()
        .with("tokens")
        .where("email", emailResult)
        // .setHidden(["created_at", "updated_at"])
        .fetch();

      const userCheckToken_converted = userCheckToken.toJSON();
      if (
        userCheckToken_converted.length > 0 &&
        userCheckToken_converted[0].tokens[0].is_revoked === 0
      ) {
        return response.status(200).json({
          type: "success",
          status_code: 200,
          message: "Access your mailbox and confirm your user.",
          user_message: "Acesse sua caixa de emails e condirme seu usuário.",
          data: [],
        });
      }

      // return userCheckToken_converted.length;
      // return userCheckToken_converted[0].tokens[0].is_revoked;

      const token = await auth
        .withRefreshToken()
        .attempt(emailResult, userObj.password);

      return response.status(200).json({
        type: "success",
        status_code: 200,
        message: "Authentication checked.",
        user_message: "Autenticação verificada.",
        data: token,
      });
    } catch (error) {
      if (error.passwordField === "password")
        return response.status(401).json({
          type: "info",
          status_code: 401,
          message: "User our password not found",
          user_message: "Usuário ou senha inválidos",
          data: [],
        });
      else {
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

  async token_check({ request, response, auth }) {
    try {
      const user = await auth.check();

      if (user !== true) return "jwt invalido";

      return response.status(200).json({
        type: "success",
        status_code: 200,
        message: "Token successfully verified.",
        user_message: "Token verificado com sucesso.",
        data: user,
      });

      // return await auth.getUser()
    } catch (error) {
      if (
        error.toString() ===
        "InvalidJwtToken: E_INVALID_JWT_TOKEN: invalid token"
      )
        return response.status(401).json({
          type: "error",
          status_code: 401,
          message: "exception found",
          user_message: "Token invalido",
          data: false,
        });
      else if (
        error.toString() ===
        "ExpiredJwtToken: E_JWT_TOKEN_EXPIRED: The jwt token has been expired. Generate a new one to continue"
      )
        return response.status(401).json({
          type: "error",
          status_code: 401,
          message: "exception found",
          user_message: "Token expirado",
          data: false,
        });
      else if (
        error.toString() ===
        "InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided"
      )
        return response.status(403).json({
          type: "error",
          status_code: 403,
          message: "requered token",
          user_message: "Token obrigatório",
          data: [],
        });
      else
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
module.exports = AuthController;
