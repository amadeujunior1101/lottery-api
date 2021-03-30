"use strict";
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
class UpdateUser {
  get rules() {
    const userId = this.ctx._auth_.jwtPayload.uid;
    return {
      // validar pelo id
      full_name: "required",
      email: `unique:users,email,id,${userId}`,
      password: "required|min:6",
    };
  }

  get messages() {
    return {
      "full_name.required": {
        type: "info",
        message: "Required full_name.",
        user_message: "Nome completo obrigatório.",
        data: [],
      },
      "email.required": {
        type: "info",
        message: "Required E-mail.",
        user_message: "E-mail obrigatório.",
        data: [],
      },
      "email.email": {
        type: "info",
        message: "Incorrect email format.l",
        user_message: "Formato de E-mail incorreto.",
        data: [],
      },

      "email.unique": {
        type: "info",
        message: "E-mail already registered.",
        user_message: "E-mail já cadastrado.",
        data: [],
      },

      "password.required": {
        type: "info",
        message: "Required password.",
        user_message: "Senha obrigatória.",
        data: [],
      },

      "password.min": {
        type: "info",
        message: "password six characters minimum required.",
        user_message: "Senha com o mínimo de 6 caracteres obrigatórios.",
        data: [],
      },
    };
  }
  async fails(errorMessages) {
    return this.ctx.response.json(errorMessages[0].message);
  }
}

module.exports = UpdateUser;
