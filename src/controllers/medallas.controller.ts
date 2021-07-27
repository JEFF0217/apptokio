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
import {Medallas} from '../models';
import {MedallasRepository} from '../repositories';

export class MedallasController {
  constructor(
    @repository(MedallasRepository)
    public medallasRepository : MedallasRepository,
  ) {}

  @post('/medallas')
  @response(200, {
    description: 'Medallas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Medallas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medallas, {
            title: 'NewMedallas',
            exclude: ['id'],
          }),
        },
      },
    })
    medallas: Omit<Medallas, 'id'>,
  ): Promise<Medallas> {
    return this.medallasRepository.create(medallas);
  }

  @get('/medallas/count')
  @response(200, {
    description: 'Medallas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Medallas) where?: Where<Medallas>,
  ): Promise<Count> {
    return this.medallasRepository.count(where);
  }

  @get('/medallas')
  @response(200, {
    description: 'Array of Medallas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Medallas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Medallas) filter?: Filter<Medallas>,
  ): Promise<Medallas[]> {
    return this.medallasRepository.find(filter);
  }

  @patch('/medallas')
  @response(200, {
    description: 'Medallas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medallas, {partial: true}),
        },
      },
    })
    medallas: Medallas,
    @param.where(Medallas) where?: Where<Medallas>,
  ): Promise<Count> {
    return this.medallasRepository.updateAll(medallas, where);
  }

  @get('/medallas/{id}')
  @response(200, {
    description: 'Medallas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Medallas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Medallas, {exclude: 'where'}) filter?: FilterExcludingWhere<Medallas>
  ): Promise<Medallas> {
    return this.medallasRepository.findById(id, filter);
  }

  @patch('/medallas/{id}')
  @response(204, {
    description: 'Medallas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medallas, {partial: true}),
        },
      },
    })
    medallas: Medallas,
  ): Promise<void> {
    await this.medallasRepository.updateById(id, medallas);
  }

  @put('/medallas/{id}')
  @response(204, {
    description: 'Medallas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() medallas: Medallas,
  ): Promise<void> {
    await this.medallasRepository.replaceById(id, medallas);
  }

  @del('/medallas/{id}')
  @response(204, {
    description: 'Medallas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.medallasRepository.deleteById(id);
  }
}
