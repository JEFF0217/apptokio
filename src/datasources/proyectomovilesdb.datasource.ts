import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'clearDB_heroku',
  connector: 'mysql',
  url: '',
  host: 'us-cdbr-east-04.cleardb.com',
  port: 3306,
  user: 'b1f0cf5b20a63a',
  password: '499e6c8c',
  database: 'heroku_20706bb6858ab8b'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProyectomovilesdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'proyectomovilesdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.proyectomovilesdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
