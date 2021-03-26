"use strict";

class CreateGame {
  get rules() {
    return {
      type: "required",
      description: "required",
      range: "required|number",
      price: "required",
      max_number: "required",
      color: "required",
      min_cart_value: "required",
    };
  }

  get messages() {
    return {
      "type.required": {
        type: "info",
        message: "Required type game.",
        user_message: "Nome do jogo obrigatório.",
        data: [],
      },
      "type.unique": {
        type: "info",
        message: "Type game already registered.",
        user_message: "Jogo já cadastrado.",
        data: [],
      },
      "description.required": {
        type: "info",
        message: "Required description.",
        user_message: "Descrição obrigatória.",
        data: [],
      },

      "range.required": {
        type: "info",
        message: "Required range.",
        user_message: "Quantidade de numeros obrigatória.",
        data: [],
      },
      "range.number": {
        type: "info",
        message: "Required range number integer.",
        user_message: "Número inteiro no range obrigatório.",
        data: [],
      },
      // "range.min": {
      //   type: "info",
      //   message: "Required range number integer.",
      //   user_message: "Número inteiro no range.",
      //   data: [],
      // },

      "price.required": {
        type: "info",
        message: "Required price.",
        user_message: "Preço obrigatório.",
        data: [],
      },

      "max_number.required": {
        type: "info",
        message: "Required max number.",
        user_message: "Numero máximo obrigatório.",
        data: [],
      },

      "color.required": {
        type: "info",
        message: "Required color.",
        user_message: "Cor obrigatória.",
        data: [],
      },

      "min_cart_value.required": {
        type: "info",
        message: "Required minimum bet amount required.",
        user_message: "Valor minimo da aposta obrigatório.",
        data: [],
      },
    };
  }
  async fails(errorMessages) {
    return this.ctx.response.json(errorMessages[0].message);
  }
}

module.exports = CreateGame;
