'use strict'

class AuthController {
    async store({ auth, request, response }){

        const { email, password } = request.all()
        
        try {
            return await auth.attempt(email, password)
        } catch (error) {
            return response.status(400).send({error: 'Usuario ou Senha inválido'})
        }
    
      }
}

module.exports = AuthController
