import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GenreValidator from 'App/Validators/GenreValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class GenresController {
  public async index({ response }: HttpContextContract) {
    try {
      let payload = await Database.from('genres').select('*')
      response.status(200).json({
        data: payload,
      })
    } catch (error) {
      response.badRequest(error)
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(GenreValidator)
      await Database.table('genres').insert({
        name: request.input('name'),
      })
      response.created({
        message: 'Berhasil insert data',
      })
    } catch (error) {
      response.badRequest(error)
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let { id } = params
      let payload = await Database.from('genres').select('*').where('id', id)
      response.status(200).json({
        payload,
      })
    } catch (error) {
      response.badRequest(error)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      await request.validate(GenreValidator)

      let { id } = params
      const idUpdate = await Database.from('genres')
        .where('id', id)
        .update({
          name: request.input('name'),
        })

      const selectedUpdate = await Database.from('genres').select('*').where('id', idUpdate)

      response.status(200).json({
        message: 'Berhasil ubah data',
        data: selectedUpdate,
      })
    } catch (error) {
      response.badRequest(error)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      let { id } = params
      await Database.from('genres').where('id', id).delete()
      response.status(200).json({
        message: 'Berhasil delete data',
      })
    } catch (error) {
      response.badRequest(error)
    }
  }
}
