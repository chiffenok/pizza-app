let app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');

const Pizza = require('../models/Pizzas');
const User = require('../models/User');

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/pizza-app`;
    await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async () => {
    await Pizza.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
    app.close();
});

describe('Test Pizzas routes', () => {
    it('should post pizza to api/pizzas', async () => {
        const res = await request.post('/api/pizzas/').send({
            name: 'Gawaii',
        });
        expect(res.statusCode).toEqual(201);
        expect((res) => {
            res.body[0].name = 'Gawaii';
            res.body[0].likesCount = 1;
        });

        const pizza = await Pizza.findOne({ name: 'Gawaii' });
        expect(pizza.name).toBeTruthy();
        expect(pizza.likesCount).toBe(0);

        //done();
    });

    it('should get pizzas from api/pizzas', async () => {
        const res = await request.get('/api/pizzas/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect((res) => {
            res.body[0].name = 'Gawaii';
            res.body[0].likesCount = 1;
        });
    });
});

describe('Test User routes', () => {
    it('should not login calling api/user/login, if user do not exist', async (done) => {
        const res = await request.post('/api/user/login').send({
            email: 'test@gmail.com',
            password: '1234',
        });
        console.log(res.body);
        expect(res.statusCode).toEqual(401);

        done();
    });

    it('should signup calling api/user/signup', async (done) => {
      const res = await request.post('/api/user/signup').send({
          email: 'test@gmail.com',
          password: '1234',
      });
      console.log(res.body);
      expect(res.statusCode).toEqual(201);

      done();
  });

  it('should login calling api/user/login', async (done) => {
    const res = await request.post('/api/user/login').send({
        email: 'test@gmail.com',
        password: '1234',
    });
    console.log(res.body);
    expect(res.statusCode).toEqual(200);

    done();
});
});
