import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MovieValidator from 'App/Validators/MovieValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MoviesController {
  public async index({ response }: HttpContextContract) {
    try {
      let payload = await Database.from('movies').select('*')
      response.status(200).json({
        data: payload,
      })
    } catch (error) {
      throw error
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(MovieValidator)
      await Database.table('movies').insert({
        title: request.input('title'),
        resume: request.input('resume'),
        release_date: request.input('release_date'),
        id_genre: request.input('id_genre'),
      })
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
      let payload = await Database.from('movies')
        .join('genres', 'movies.id_genre', '=', 'genres.id')
        .select('movies.id', 'title', 'resume', 'release_date', 'name as genre')
        .where('movies.id', id)
      response.status(200).json({
        data: payload,
      })
    } catch (error) {
      throw error
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      await request.validate(MovieValidator)

      let { id } = params
      const idUpdate = await Database.from('movies')
        .where('id', id)
        .update({
          title: request.input('title'),
          resume: request.input('resume'),
          release_date: request.input('release_date'),
          id_genre: request.input('id_genre'),
        })

      const selectedUpdate = await Database.from('movies').select('*').where('id', idUpdate)

      response.status(200).json({
        message: 'Berhasil ubah data',
        data: selectedUpdate,
      })
    } catch (error) {
      throw error
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      let { id } = params
      await Database.from('movies').where('id', id).delete()
      response.status(200).json({
        message: 'Berhasil delete data',
      })
    } catch (error) {
      throw error
    }
  }
}
