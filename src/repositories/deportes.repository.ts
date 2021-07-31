import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectomovilesdbDataSource} from '../datasources';
import {Deportes, DeportesRelations, Eventos} from '../models';
import {EventosRepository} from './eventos.repository';

export class DeportesRepository extends DefaultCrudRepository<
  Deportes,
  typeof Deportes.prototype.id,
  DeportesRelations
> {

  public readonly eventos: HasManyRepositoryFactory<Eventos, typeof Deportes.prototype.id>;

  constructor(
    @inject('datasources.proyectomovilesdb') dataSource: ProyectomovilesdbDataSource, @repository.getter('EventosRepository') protected eventosRepositoryGetter: Getter<EventosRepository>,
  ) {
    super(Deportes, dataSource);
    this.eventos = this.createHasManyRepositoryFactoryFor('eventos', eventosRepositoryGetter,);
    this.registerInclusionResolver('eventos', this.eventos.inclusionResolver);
  }
}
