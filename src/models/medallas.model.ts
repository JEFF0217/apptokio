import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Medallas extends Entity {
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
  ano: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  paisId: number;

  @property({
    type: 'number',
    required: true,
  })
  eventoId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Medallas>) {
    super(data);
  }
}

export interface MedallasRelations {
  // describe navigational properties here
}

export type MedallasWithRelations = Medallas & MedallasRelations;
