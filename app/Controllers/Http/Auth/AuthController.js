"use strict";

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
}
module.exports = AuthController;
