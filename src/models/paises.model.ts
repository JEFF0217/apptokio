import {Entity, model, property, hasMany} from '@loopback/repository';
import {Medallas} from './medallas.model';

@model({settings: {strict: false}})
export class Paises extends Entity {

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
  nombre: string;

  @hasMany(() => Medallas, {keyTo: 'paisId'})
  medallas: Medallas[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Paises>) {
    super(data);
  }
}

export interface PaisesRelations {
  // describe navigational properties here
}

export type PaisesWithRelations = Paises & PaisesRelations;
