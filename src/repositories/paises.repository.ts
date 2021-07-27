import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectomovilesdbDataSource} from '../datasources';
import {Paises, PaisesRelations} from '../models';

export class PaisesRepository extends DefaultCrudRepository<
  Paises,
  typeof Paises.prototype.id,
  PaisesRelations
> {
  constructor(
    @inject('datasources.proyectomovilesdb') dataSource: ProyectomovilesdbDataSource,
  ) {
    super(Paises, dataSource);
  }
}
