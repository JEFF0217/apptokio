import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectomovilesdbDataSource} from '../datasources';
import {Paises, PaisesRelations, Medallas} from '../models';
import {MedallasRepository} from './medallas.repository';

export class PaisesRepository extends DefaultCrudRepository<
  Paises,
  typeof Paises.prototype.id,
  PaisesRelations
> {

  public readonly medallas: HasManyRepositoryFactory<Medallas, typeof Paises.prototype.id>;

  constructor(
    @inject('datasources.proyectomovilesdb') dataSource: ProyectomovilesdbDataSource, @repository.getter('MedallasRepository') protected medallasRepositoryGetter: Getter<MedallasRepository>,
  ) {
    super(Paises, dataSource);
    this.medallas = this.createHasManyRepositoryFactoryFor('medallas', medallasRepositoryGetter,);
    this.registerInclusionResolver('medallas', this.medallas.inclusionResolver);
  }
}
