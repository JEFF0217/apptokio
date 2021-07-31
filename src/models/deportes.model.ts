import {Entity, model, property, hasMany} from '@loopback/repository';
import {Eventos} from './eventos.model';

@model()
export class Deportes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Eventos, {keyTo: 'deporteId'})
  eventos: Eventos[];

  constructor(data?: Partial<Deportes>) {
    super(data);
  }
}

export interface DeportesRelations {
  // describe navigational properties here
}

export type DeportesWithRelations = Deportes & DeportesRelations;
