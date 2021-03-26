"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token");
const crypto = require("crypto");
const Mail = use("Mail");

class UserController {
  async store({ request, response }) {
    try {
      const userObj = request.only(["full_name", "email", "password"]);

      const user = await User.create({
        full_name: userObj.full_name,
        email: userObj.email,
        password: userObj.password,
      });

      let now = new Date();

      const token = await Token.create({
        user_id: user.id,
        token:
          crypto.randomBytes(20).toString("hex") +
          now.getDate() +
          now.getHours() +
          now.getMinutes() +
          now.getSeconds(),
        type: "jwt",
        created_at: new Date(),
      });

      let dataEmail = [
        {
          token: token.token,
          full_name: userObj.full_name
            .trim()
            .replace(/\s{2,}/g, " ")
            .replace(/[^a-zA-Z ]/g, "")
            .toUpperCase(),
        },
      ];

      await Mail.send(["emails.confirm-user"], dataEmail[0], (message) => {
        message
          .to(user.email)
          .from("contato@deliveryserver.com.br")
          .subject("Obrigado por confirmar seu endereço de e-mail");
      });

      return response.status(200).json({
        type: "success",
        status_code: 200,
        message: "Access your email and confirm your username.",
        user_message: "Acesse seu email e confirme seu usuário.",
        data: [],
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        data: { error: error.toString() },
      });
    }
  }

  async show({ request, params, response, auth, Headers }) {
    try {
      const user = auth.user;
      return response.status(200).json({
        type: "success",
        user: { id: user.id, full_name: user.full_name, email: user.email },
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        data: { error: error.toString() },
      });
    }
  }

  async update({ auth, params, request, response }) {
    try {
      const user = auth.user;
      const userObj = request.only(["full_name", "email", "password"]);
      // return userObj;
      if (!user.id) {
        return response.status(200).json({
          type: "success",
          message: "User not found.",
          user_message: "Usuário não encontrado.",
          data: [],
        });
      }
      // await User.query().where("id", user.id).update({
      //   full_name: userObj.full_name,
      //   email: userObj.email,
      //   password: userObj.password,
      // });

      const user2 = await User.findBy("id", user.id);
      (user2.full_name = userObj.full_name),
        (user2.email = userObj.email),
        (user2.password = userObj.password),
        await user2.save();

      return response.status(200).json({
        type: "success",
        message: "User updated successfully.",
        user_message: "Usuário atualizado com sucesso.",
        data: [],
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        data: { error: error.toString() },
      });
    }
  }

  async delete({ params, request, response }) {}
}

module.exports = UserController;
