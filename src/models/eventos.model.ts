import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Eventos extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  deporteId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Eventos>) {
    super(data);
  }
}

export interface EventosRelations {
  // describe navigational properties here
}

export type EventosWithRelations = Eventos & EventosRelations;
