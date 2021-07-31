import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Medallas,
  Eventos,
} from '../models';
import {MedallasRepository} from '../repositories';

export class MedallasEventosController {
  constructor(
    @repository(MedallasRepository)
    public medallasRepository: MedallasRepository,
  ) { }

  @get('/medallas/{id}/eventos', {
    responses: {
      '200': {
        description: 'Eventos belonging to Medallas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Eventos)},
          },
        },
      },
    },
  })
  async getEventos(
    @param.path.number('id') id: typeof Medallas.prototype.id,
  ): Promise<Eventos> {
    return this.medallasRepository.evento(id);
  }
}
