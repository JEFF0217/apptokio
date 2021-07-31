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
  Deportes,
  Eventos,
} from '../models';
import {DeportesRepository} from '../repositories';

export class DeportesEventosController {
  constructor(
    @repository(DeportesRepository) protected deportesRepository: DeportesRepository,
  ) { }

  @get('/deportes/{id}/eventos', {
    responses: {
      '200': {
        description: 'Array of Deportes has many Eventos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Eventos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Eventos>,
  ): Promise<Eventos[]> {
    return this.deportesRepository.eventos(id).find(filter);
  }

  @post('/deportes/{id}/eventos', {
    responses: {
      '200': {
        description: 'Deportes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Eventos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Deportes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eventos, {
            title: 'NewEventosInDeportes',
            exclude: ['id'],
            optional: ['deporteId']
          }),
        },
      },
    }) eventos: Omit<Eventos, 'id'>,
  ): Promise<Eventos> {
    return this.deportesRepository.eventos(id).create(eventos);
  }

  @patch('/deportes/{id}/eventos', {
    responses: {
      '200': {
        description: 'Deportes.Eventos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eventos, {partial: true}),
        },
      },
    })
    eventos: Partial<Eventos>,
    @param.query.object('where', getWhereSchemaFor(Eventos)) where?: Where<Eventos>,
  ): Promise<Count> {
    return this.deportesRepository.eventos(id).patch(eventos, where);
  }

  @del('/deportes/{id}/eventos', {
    responses: {
      '200': {
        description: 'Deportes.Eventos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Eventos)) where?: Where<Eventos>,
  ): Promise<Count> {
    return this.deportesRepository.eventos(id).delete(where);
  }
}
