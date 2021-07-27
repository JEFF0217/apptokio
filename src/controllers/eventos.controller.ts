import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Eventos} from '../models';
import {EventosRepository} from '../repositories';

export class EventosController {
  constructor(
    @repository(EventosRepository)
    public eventosRepository : EventosRepository,
  ) {}

  @post('/eventos')
  @response(200, {
    description: 'Eventos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Eventos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eventos, {
            title: 'NewEventos',
            exclude: ['id'],
          }),
        },
      },
    })
    eventos: Omit<Eventos, 'id'>,
  ): Promise<Eventos> {
    return this.eventosRepository.create(eventos);
  }

  @get('/eventos/count')
  @response(200, {
    description: 'Eventos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Eventos) where?: Where<Eventos>,
  ): Promise<Count> {
    return this.eventosRepository.count(where);
  }

  @get('/eventos')
  @response(200, {
    description: 'Array of Eventos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Eventos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Eventos) filter?: Filter<Eventos>,
  ): Promise<Eventos[]> {
    return this.eventosRepository.find(filter);
  }

  @patch('/eventos')
  @response(200, {
    description: 'Eventos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eventos, {partial: true}),
        },
      },
    })
    eventos: Eventos,
    @param.where(Eventos) where?: Where<Eventos>,
  ): Promise<Count> {
    return this.eventosRepository.updateAll(eventos, where);
  }

  @get('/eventos/{id}')
  @response(200, {
    description: 'Eventos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Eventos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Eventos, {exclude: 'where'}) filter?: FilterExcludingWhere<Eventos>
  ): Promise<Eventos> {
    return this.eventosRepository.findById(id, filter);
  }

  @patch('/eventos/{id}')
  @response(204, {
    description: 'Eventos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eventos, {partial: true}),
        },
      },
    })
    eventos: Eventos,
  ): Promise<void> {
    await this.eventosRepository.updateById(id, eventos);
  }

  @put('/eventos/{id}')
  @response(204, {
    description: 'Eventos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() eventos: Eventos,
  ): Promise<void> {
    await this.eventosRepository.replaceById(id, eventos);
  }

  @del('/eventos/{id}')
  @response(204, {
    description: 'Eventos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eventosRepository.deleteById(id);
  }
}
