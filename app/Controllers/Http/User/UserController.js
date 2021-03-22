"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token");
const crypto = require("crypto");
const Mail = use("Mail");

class UserController {

  async index({ request, response, view }) {}

  async store({ request, response }) {
    const userObj = request.only(["full_name", "email", "password"]);

    const existEmail = await User.findBy("email", userObj.email);

    if (existEmail)
      return response.status(200).json({
        type: "success",
        status_code: 200,
        message: "E-mail already registered.",
        user_message: "E-mail já cadastrado.",
        data: [],
      });

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
        full_name: userObj.full_name,
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
  }

  async show({ params, response }) {
    auth.user;
    try {
      const user = User.findOrFail(params.id);
      // await user.load('profile')
      return user;
    } catch (error) {
      return response.status(400).send({ error: "Id nao!" });
    }
  }

  async update({ auth, params, request, response }) {
    const user = auth.user;
    const data = request.all();
    try {
      const user = User.findOrFail(params.id);
      user.merge(data);
      // await user.load('profile')
      return user;
    } catch (error) {
      return response.status(400).send({ error: "Id nao!" });
    }
  }

  async delete({ params, request, response }) {

  }
}

module.exports = UserController;
