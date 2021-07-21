import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'clearDB_heroku',
  connector: 'mysql',
  url: '',
  host: 'us-cdbr-east-04.cleardb.com',
  port: 3306,
  user: 'b77214896aa644',
  password: '9d4842d9',
  database: 'heroku_ac8dd84c7b5b059 '
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
