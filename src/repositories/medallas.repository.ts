import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProyectomovilesdbDataSource} from '../datasources';
import {Medallas, MedallasRelations, Paises, Eventos} from '../models';
import {PaisesRepository} from './paises.repository';
import {EventosRepository} from './eventos.repository';

export class MedallasRepository extends DefaultCrudRepository<
  Medallas,
  typeof Medallas.prototype.id,
  MedallasRelations
> {

  public readonly pais: BelongsToAccessor<Paises, typeof Medallas.prototype.id>;

  public readonly evento: BelongsToAccessor<Eventos, typeof Medallas.prototype.id>;

  constructor(
    @inject('datasources.proyectomovilesdb') dataSource: ProyectomovilesdbDataSource, @repository.getter('PaisesRepository') protected paisesRepositoryGetter: Getter<PaisesRepository>, @repository.getter('EventosRepository') protected eventosRepositoryGetter: Getter<EventosRepository>,
  ) {
    super(Medallas, dataSource);
    this.evento = this.createBelongsToAccessorFor('evento', eventosRepositoryGetter,);
    this.registerInclusionResolver('evento', this.evento.inclusionResolver);
    this.pais = this.createBelongsToAccessorFor('pais', paisesRepositoryGetter,);
    this.registerInclusionResolver('pais', this.pais.inclusionResolver);
  }
}
