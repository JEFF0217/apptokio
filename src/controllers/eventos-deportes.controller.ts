import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Eventos,
  Deportes,
} from '../models';
import {EventosRepository} from '../repositories';

export class EventosDeportesController {
  constructor(
    @repository(EventosRepository)
    public eventosRepository: EventosRepository,
  ) { }

  @get('/eventos/{id}/deportes', {
    responses: {
      '200': {
        description: 'Deportes belonging to Eventos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Deportes)},
          },
        },
      },
    },
  })
  async getDeportes(
    @param.path.number('id') id: typeof Eventos.prototype.id,
  ): Promise<Deportes> {
    return this.eventosRepository.deporte(id);
  }
}
