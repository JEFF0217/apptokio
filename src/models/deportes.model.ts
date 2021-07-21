import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Deportes>) {
    super(data);
  }
}

export interface DeportesRelations {
  // describe navigational properties here
}

export type DeportesWithRelations = Deportes & DeportesRelations;
