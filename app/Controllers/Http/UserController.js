'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const crypto = require('crypto')
const Mail = use('Mail')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const { full_name, email, profile_id } = request.all()

    const existEmail = await User.findBy('email', email)

    if (existEmail) return response.status(400).send({ 'error': 'E-mail já cadastrado!' })

    const user = await User.create({
      full_name,
      email,
      profile_id
    })

    let now = new Date

    const token1 = await Token.create({
      user_id: user.id,
      token: crypto.randomBytes(20).toString('hex') + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds(),
      type: 'jwt',
      created_at: new Date()
    })

    var dataEmail = [
      {
        "token": token1.token,
        "full_name": full_name
      }
    ]

    await Mail.send(["emails.confirm-user"], dataEmail[0], message => {
      message
        .to(user.email)
        .from("contato@deliveryserver.com.br")
        .subject("Obrigado por confirmar seu endereço de e-mail");
    });

    // TODO: send email to activet

    return response.status(201).send({ "error": "false", "status": "Acesse seu email e confirme seu usuário" });

  }


  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    auth.user
    try {
      const user = User.findOrFail(params.id)
      // await user.load('profile')
      return user
    } catch (error) {
      return response.status(400).send({ 'error': 'Id nao!' })
    }

  }



  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   * 
   */
  async update({ auth, params, request, response }) {
    const user = auth.user
    const data = request.all()
    try {
      const user = User.findOrFail(params.id)
      user.merge(data)
      // await user.load('profile')
      return user
    } catch (error) {
      return response.status(400).send({ 'error': 'Id nao!' })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = UserController
