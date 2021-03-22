'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    // await User.create({
    //   full_name: "test hkbjhlk",
    //   email: "email2@email.com",
    //   password: "123456",
    //   profile_id: 2
    // })
  }
}

module.exports = UserSeeder
