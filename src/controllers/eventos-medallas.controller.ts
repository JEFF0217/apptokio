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
  Eventos,
  Medallas,
} from '../models';
import {EventosRepository} from '../repositories';

export class EventosMedallasController {
  constructor(
    @repository(EventosRepository) protected eventosRepository: EventosRepository,
  ) { }

  @get('/eventos/{id}/medallas', {
    responses: {
      '200': {
        description: 'Array of Eventos has many Medallas',
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
    return this.eventosRepository.medallas(id).find(filter);
  }

  @post('/eventos/{id}/medallas', {
    responses: {
      '200': {
        description: 'Eventos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medallas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Eventos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medallas, {
            title: 'NewMedallasInEventos',
            exclude: ['id'],
            optional: ['eventoId']
          }),
        },
      },
    }) medallas: Omit<Medallas, 'id'>,
  ): Promise<Medallas> {
    return this.eventosRepository.medallas(id).create(medallas);
  }

  @patch('/eventos/{id}/medallas', {
    responses: {
      '200': {
        description: 'Eventos.Medallas PATCH success count',
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
    return this.eventosRepository.medallas(id).patch(medallas, where);
  }

  @del('/eventos/{id}/medallas', {
    responses: {
      '200': {
        description: 'Eventos.Medallas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Medallas)) where?: Where<Medallas>,
  ): Promise<Count> {
    return this.eventosRepository.medallas(id).delete(where);
  }
}
