"use strict";

class CreateUser {
  get rules() {
    return {
      full_name: "required",
      email: "required|email|unique:users",
      password: "required|min:6",
    };
  }

  get messages() {
    return {
      "full_name.required": {
        type: "info",
        status_code: 201,
        message: "Required full_name.",
        user_message: "Nome completo obrigatório.",
        data: [],
      },
      "email.required": {
        type: "info",
        status_code: 201,
        message: "Required E-mail.",
        user_message: "E-mail obrigatório.",
        data: [],
      },
      "email.email": {
        type: "info",
        status_code: 201,
        message: "Incorrect email format.l",
        user_message: "Formato de E-mail incorreto.",
        data: [],
      },

      "email.unique": {
        type: "info",
        status_code: 201,
        message: "E-mail already registered.",
        user_message: "E-mail já cadastrado.",
        data: [],
      },

      "password.required": {
        type: "info",
        status_code: 201,
        message: "Required password.",
        user_message: "Senha obrigatória.",
        data: [],
      },

      "password.min": {
        type: "info",
        status_code: 201,
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

module.exports = CreateUser;
