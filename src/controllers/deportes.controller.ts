import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Deportes} from '../models';
import {DeportesRepository} from '../repositories';

export class DeportesController {
  constructor(
    @repository(DeportesRepository)
    public deportesRepository: DeportesRepository,
  ) { }

  @post('/deportes')
  @response(200, {
    description: 'Deportes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Deportes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deportes, {
            title: 'NewDeportes',
            exclude: ['id'],
          }),
        },
      },
    })
    deportes: Omit<Deportes, 'id'>,
  ): Promise<Deportes> {
    return this.deportesRepository.create(deportes);
  }

  @get('/deportes/count')
  @response(200, {
    description: 'Deportes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Deportes) where?: Where<Deportes>,
  ): Promise<Count> {
    return this.deportesRepository.count(where);
  }

  @get('/deportes')
  @response(200, {
    description: 'Array of Deportes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Deportes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Deportes) filter?: Filter<Deportes>,
  ): Promise<Deportes[]> {
    return this.deportesRepository.find(filter);
  }

  @patch('/deportes')
  @response(200, {
    description: 'Deportes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deportes, {partial: true}),
        },
      },
    })
    deportes: Deportes,
    @param.where(Deportes) where?: Where<Deportes>,
  ): Promise<Count> {
    return this.deportesRepository.updateAll(deportes, where);
  }

  @get('/deportes/{id}')
  @response(200, {
    description: 'Deportes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deportes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Deportes, {exclude: 'where'}) filter?: FilterExcludingWhere<Deportes>
  ): Promise<Deportes> {
    return this.deportesRepository.findById(id, filter);
  }

  @patch('/deportes/{id}')
  @response(204, {
    description: 'Deportes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deportes, {partial: true}),
        },
      },
    })
    deportes: Deportes,
  ): Promise<void> {
    await this.deportesRepository.updateById(id, deportes);
  }

  @put('/deportes/{id}')
  @response(204, {
    description: 'Deportes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() deportes: Deportes,
  ): Promise<void> {
    await this.deportesRepository.replaceById(id, deportes);
  }

  @del('/deportes/{id}')
  @response(204, {
    description: 'Deportes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deportesRepository.deleteById(id);
  }
}
