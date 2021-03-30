"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token");
const crypto = require("crypto");
const Mail = use("Mail");

class UserController {
  async index({ request, response }) {
    try {
      const users = await User.query()
        .setHidden(["password", "reset_password", "created_at", "updated_at"])
        .fetch();

      return response.status(200).json({
        type: "success",
        message: "List users.",
        message_user: "Lista de usuários.",
        data: users,
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

      let dataEmail = {
        token: token.token,
        full_name: userObj.full_name
          .trim()
          .replace(/\s{2,}/g, " ")
          .replace(/[^a-zA-Z ]/g, "")
          .toUpperCase(),
      };

      await Mail.send(["emails.confirm-user"], dataEmail, (message) => {
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

      if (!user.id) {
        return response.status(200).json({
          type: "success",
          message: "User not found.",
          user_message: "Usuário não encontrado.",
          data: [],
        });
      }

      const instance_user = await User.find(user.id);

      instance_user.merge({
        full_name: userObj.full_name,
        email: userObj.email,
        password: userObj.password,
      });

      await instance_user.save();

      return response.status(200).json({
        type: "success",
        message: "User updated successfully.",
        user_message: "Usuário atualizado com sucesso.",
        data: [],
      });
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

      await User.query().where("id", user.id).delete();

      return response.status(200).json({
        type: "success",
        message: "User removed successfully.",
        user_message: "Usuário removido com sucesso.",
        data: [],
      });
    } catch (error) {
      return response.status(503).json({
        type: "error",
        error: "Usuario não pode ser removido porque faz referencia a ",
      });
    }
  }
}

module.exports = UserController;
