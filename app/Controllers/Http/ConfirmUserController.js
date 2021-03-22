'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const moment = require('moment')

class ConfirmUserController {

    async edit({ request, response, params, view }) {
        //return response.redirect("/register/confirm/");
        const checkToken = await Token.findBy("token", params.token);

        if (!checkToken) return view.render("emails.register-user", { 'msg': 'Token invalido' });

        if (checkToken.is_revoked == 1) return view.render("emails.register-user", { "msg": "Token revogado" });

        const tokenExpired = moment()
            .subtract('2', 'days')
            .isAfter(checkToken.created_at)

        if (tokenExpired) {
            // return response.status(401).send({
            //     error: { message: 'O token de recuperação está expirado' }
            // })
            return view.render("emails.register-user", { 'msg': 'Token expirado' });
        }

        return view.render("emails.register-user", { "msg": "Token valido" });

    }

    async update({ request, response, params }) {
        const { password } = request.all();

        const checkToken = await Token.findBy('token', params.token)

        if (!checkToken) return response.status(400).send({ 'error': 'Token invalido!' })

        const user = await User.findBy('id', checkToken.user_id)

        if (checkToken.is_revoked == 1) return response.status(400).send({ 'error': 'Token revogado!' })

        const tokenExpired = moment()
            .subtract('2', 'days')
            .isAfter(checkToken.created_at)

        if (tokenExpired) {
            return response.status(401).send({
                error: { message: 'O token de recuperação está expirado' }
            })
        }

        checkToken.is_revoked = 1;

        user.password = password;

        await checkToken.save();

        await user.save();

        return response.status(204).send({
            success: { message: 'Endereço confirmado com sucesso!' }
        })
    }

}

module.exports = ConfirmUserController

