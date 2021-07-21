import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectomovilesdbDataSource} from '../datasources';
import {Deportes, DeportesRelations} from '../models';

export class DeportesRepository extends DefaultCrudRepository<
  Deportes,
  typeof Deportes.prototype.id,
  DeportesRelations
> {
  constructor(
    @inject('datasources.proyectomovilesdb') dataSource: ProyectomovilesdbDataSource,
  ) {
    super(Deportes, dataSource);
  }
}
