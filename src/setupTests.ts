require("dotenv").config();

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


const urlRegex = /localhost:[0-9]{1,5}/g;

expect.addSnapshotSerializer({
  test: (val) => {
    return typeof val === "string" && urlRegex.test(val);
  },
  print: (val: string) => {
    return val.replace(urlRegex, "localhost.com");
  },
});
