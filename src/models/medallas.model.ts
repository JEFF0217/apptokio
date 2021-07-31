import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Paises} from './paises.model';
import {Eventos} from './eventos.model';

@model({
  settings:{
    strict: false,
    foreignKeys: {
      fk_pais_id: {
        name: 'fk_pais_id',
        entity: 'Paises',
        entityKey: 'id',
        foreignKey: 'paisId',
      },
      fk_eventos_id: {
        name: 'fk_eventos_id',
        entity: 'Eventos',
        entityKey: 'id',
        foreignKey: 'eventoId',
      },
    },
  },
})

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
  @belongsTo(() => Paises)
  paisId: number;

  @belongsTo(() => Eventos)
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
