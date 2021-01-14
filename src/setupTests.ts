import axios from 'axios';
import { listeners } from 'src/server/testing-utils/makeUrl';

axios.defaults.adapter = require('axios/lib/adapters/http');

// Clear all mocks after each test.
afterEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  listeners.forEach(listener => listener.server.close());
})

// jest.mock('@stackshirts/sdk/methods', () => {
//   return {
//     getResource: jest.fn(v => (v)),
//     upsertResource: jest.fn(v => v),
//     upsertResources: jest.fn(v => v),
//   };
// });

// Setup firebase snapshots
// const { firebasePing, configureToMatchRulesSnapshot, clearAllApps } = require('firebase-rules-snapshots');
// beforeAll(async () => {
//   return firebasePing();
// })
// afterAll(async () => clearAllApps());
// const toMatchRulesSnapshot = configureToMatchRulesSnapshot({
//   customRulesPath: path.resolve(__dirname, '../../firestore.rules'),
// });
// expect.extend({
//   toMatchRulesSnapshot,
// });
