import handler from 'src/server/api/carrier-service/handler'
import makeUrl from 'src/server/testing-utils/makeUrl';
import axios from 'axios';
import { rateRequest1 } from 'src/server/api/carrier-service/__fixtures__/rateRequests';

describe('handler', () => {
  it('works', async () => {

    const url = await makeUrl(handler);
    const { data } = await axios.post(url, rateRequest1)
    expect(data).toMatchSnapshot();

  })
})
