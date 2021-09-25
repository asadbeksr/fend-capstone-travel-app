// https://zellwk.com/blog/endpoint-testing/
// https://stackoverflow.com/questions/42535270/regeneratorruntime-is-not-defined-when-running-jest-test
import 'regenerator-runtime/runtime'
const app = require ('../app')
const supertest = require('supertest');
const request = supertest(app)

it('gets the test endpoint', async done => {
    const response = await request.get('/test')  
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('test passed!')
    done()
  })