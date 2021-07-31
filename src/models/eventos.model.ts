import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Deportes} from './deportes.model';
import {Medallas} from './medallas.model';

@model({
  settings: {
    strict: false,
      foreignKeys: {
        fk_deporte_id: {
        name: 'fk_deporte_id',
        entity: 'Deportes',
        entityKey: 'id',
        foreignKey: 'deporteId',
      },
    }
  }
})
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

  @belongsTo(() => Deportes)
  deporteId: number;

  @hasMany(() => Medallas, {keyTo: 'eventoId'})
  medallas: Medallas[];
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
