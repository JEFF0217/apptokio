import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyectomovilesdbDataSource} from '../datasources';
import {Medallas, MedallasRelations} from '../models';

export class MedallasRepository extends DefaultCrudRepository<
  Medallas,
  typeof Medallas.prototype.id,
  MedallasRelations
> {
  constructor(
    @inject('datasources.proyectomovilesdb') dataSource: ProyectomovilesdbDataSource,
  ) {
    super(Medallas, dataSource);
  }
}
