import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectomovilesdbDataSource} from '../datasources';
import {Eventos, EventosRelations, Deportes, Medallas} from '../models';
import {DeportesRepository} from './deportes.repository';
import {MedallasRepository} from './medallas.repository';

export class EventosRepository extends DefaultCrudRepository<
  Eventos,
  typeof Eventos.prototype.id,
  EventosRelations
> {

  public readonly deporte: BelongsToAccessor<Deportes, typeof Eventos.prototype.id>;

  public readonly medallas: HasManyRepositoryFactory<Medallas, typeof Eventos.prototype.id>;

  constructor(
    @inject('datasources.proyectomovilesdb') dataSource: ProyectomovilesdbDataSource, @repository.getter('DeportesRepository') protected deportesRepositoryGetter: Getter<DeportesRepository>, @repository.getter('MedallasRepository') protected medallasRepositoryGetter: Getter<MedallasRepository>,
  ) {
    super(Eventos, dataSource);
    this.medallas = this.createHasManyRepositoryFactoryFor('medallas', medallasRepositoryGetter,);
    this.registerInclusionResolver('medallas', this.medallas.inclusionResolver);
    this.deporte = this.createBelongsToAccessorFor('deporte', deportesRepositoryGetter,);
    this.registerInclusionResolver('deporte', this.deporte.inclusionResolver);
  }
}
