import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Paises,
  Medallas,
} from '../models';
import {PaisesRepository} from '../repositories';

export class PaisesMedallasController {
  constructor(
    @repository(PaisesRepository) protected paisesRepository: PaisesRepository,
  ) { }

  @get('/paises/{id}/medallas', {
    responses: {
      '200': {
        description: 'Array of Paises has many Medallas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Medallas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Medallas>,
  ): Promise<Medallas[]> {
    return this.paisesRepository.medallas(id).find(filter);
  }

  @post('/paises/{id}/medallas', {
    responses: {
      '200': {
        description: 'Paises model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medallas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Paises.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medallas, {
            title: 'NewMedallasInPaises',
            exclude: ['id'],
            optional: ['paisId']
          }),
        },
      },
    }) medallas: Omit<Medallas, 'id'>,
  ): Promise<Medallas> {
    return this.paisesRepository.medallas(id).create(medallas);
  }

  @patch('/paises/{id}/medallas', {
    responses: {
      '200': {
        description: 'Paises.Medallas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medallas, {partial: true}),
        },
      },
    })
    medallas: Partial<Medallas>,
    @param.query.object('where', getWhereSchemaFor(Medallas)) where?: Where<Medallas>,
  ): Promise<Count> {
    return this.paisesRepository.medallas(id).patch(medallas, where);
  }

  @del('/paises/{id}/medallas', {
    responses: {
      '200': {
        description: 'Paises.Medallas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Medallas)) where?: Where<Medallas>,
  ): Promise<Count> {
    return this.paisesRepository.medallas(id).delete(where);
  }
}
