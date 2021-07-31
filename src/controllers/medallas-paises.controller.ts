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
  Paises,
} from '../models';
import {MedallasRepository} from '../repositories';

export class MedallasPaisesController {
  constructor(
    @repository(MedallasRepository)
    public medallasRepository: MedallasRepository,
  ) { }

  @get('/medallas/{id}/paises', {
    responses: {
      '200': {
        description: 'Paises belonging to Medallas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Paises)},
          },
        },
      },
    },
  })
  async getPaises(
    @param.path.number('id') id: typeof Medallas.prototype.id,
  ): Promise<Paises> {
    return this.medallasRepository.pais(id);
  }
}
