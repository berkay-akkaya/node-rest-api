const app = require('../app');
const supertest = require('supertest');
const event = require('../event.json');

jest.mock('../src/server');

describe('Post Request Verifier', () => {
  it('Fetching data', async () => {
    const db = require('../src/server');
    db.queryFnc.mockReturnValue([
      {
        key: 'ibfRLaFT',
        createdAt: '2016-12-25T16:43:27.909Z',
        counts: [1500, 1000, 300]
      }
    ]);

    const res = await supertest(app)
      .post('/getir/records')
      .send(event);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('records');
  });

  it('Db connection fail', async () => {
    const db = require('../src/server');
    db.queryFnc.mockReturnValue();
    const res = await supertest(app)
      .post('/getir/records')
      .send(event);
    expect(res.statusCode).toEqual(500);
    expect(res.body.code).toEqual(3);
    expect(res.body.msg).toEqual('Database Connection Failed');
  });

  it('Invalid params', async () => {
    const res = await supertest(app)
      .post('/getir/records')
      .send({ ...event, startDate: '' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.code).toEqual(1);
    expect(res.body.msg).toEqual('Given field/fields is not valid. Check your request');
  });
});
