import {ddbDocTest} from './src/daos/DB/Dynamo'

afterAll(() => {
    ddbDocTest.destroy();
  });