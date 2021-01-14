import handler from 'src/server/api/carrier-service/handler'

describe('handler', () => {
  it('works', () => {

    const url = await makeUrl(checkout);
    const { data } = await axios.post(url, webhookBody)
    expect(data).toMatchSnapshot();

  })
})
