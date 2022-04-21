import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GenreValidator from 'App/Validators/GenreValidator'
import Genre from 'App/Models/Genre'

export default class GenresController {
  public async index({ response }: HttpContextContract) {
    try {
      let payload = await Genre.query().select('*')
      response.status(200).json({
        success: true,
        data: payload,
      })
    } catch (error) {
      throw error
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(GenreValidator)

      const genre = new Genre()
      genre.name = request.input('name')

      await genre.save()

      response.created({
        message: 'Berhasil insert data',
      })
    } catch (error) {
      throw error
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let { id } = params
      let payload = await Genre.query().select('*').where('id', id).first()
      response.status(200).json({
        payload,
      })
    } catch (error) {
      throw error
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      await request.validate(GenreValidator)

      let { id } = params

      const genre = await Genre.findOrFail(id)
      genre.name = request.input('name')
      genre.save()

      response.status(200).json({
        success: true,
        message: 'Berhasil ubah data',
      })
    } catch (error) {
      throw error
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      let { id } = params
      const genre = await Genre.findOrFail(id)
      await genre.delete()
      response.status(200).json({
        message: 'Berhasil delete data',
      })
    } catch (error) {
      throw error
    }
  }
}
