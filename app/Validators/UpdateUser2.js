"use strict";
class CreateProfessional {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      full_name: "required",
      email: "email|required|exists:users, email",
      password: "required",
    };
  }

  /* get messages () {
    return {
      'email.required': 'Você deve fornecer um endereço de email.',
      'email.email': 'Você deve fornecer um endereço de email válido.',
      'password.required': 'Você deve fornecer uma senha',
      'email.exists': 'Não foi possível encontrar um usuário com esse email.'
    }
  } */

  get messages() {
    return {
      'full_name.required': 'Você deve fornecer seu nome completo.',
      'email.required': 'Você deve fornecer um endereço de email.',
      'email.email': 'Você deve fornecer um endereço de email válido.',
      'password.required': 'Você deve fornecer uma senha',
      'email.exists': 'Não foi possível encontrar um usuário com esse email.'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.json(errorMessages[0].message);
  }

  /*get rules() {
    return {
      full_name: "required",
      email: "required|unique:users",
      password: "required|min:6",
    };
  }

  get messages() {
    return {
      "full_name.required": {
        type: "info",
        status_code: 201,
        message: "Required full_name",
        user_message: "Nome completo obrigatório",
        data: [],
      },
      "email.required": {
        type: "info",
        status_code: 201,
        message: "Required E-mail",
        user_message: "E-mail obrigatório",
        data: [],
      },

      "email.unique": {
        type: "info",
        status_code: 201,
        message: "E-mail already registered",
        user_message: "E-mail já cadastrado",
        data: [],
      },

      "password.required": {
        type: "info",
        status_code: 201,
        message: "Required password",
        user_message: "Senha obrigatória",
        data: [],
      },

      "password.min": {
        type: "info",
        status_code: 201,
        message: "Six characters minimum required.",
        user_message: "Mínimo de 6 caracteres obrigatórios",
        data: [],
      },
    };
  }
  async fails(errorMessages) {
    return this.ctx.response.json(errorMessages[0].message);
  }*/
}

module.exports = CreateProfessional;
