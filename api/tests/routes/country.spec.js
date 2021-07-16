/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn, Activity } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: 'ARG',
  name: 'Argentina',
  flagimage: 'https://restcountries.eu/data/arg.svg',
  continente: 'Americas',
  capital: 'Buenos Aires',
};

describe('Country routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));

  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });

  describe('GET /countries/:idPais', function () {
    it('responde con 500 cuando el pais no existe', function () {
      return agent.get('/countries/:ARM')
        .expect(500);
    });
    it('responde con 200 cuando el pais existe', function () {
      return Country.create({
        id: 'ALA',
        name: 'Åland Islands',
        flagimage: 'https://restcountries.eu/data/ala.svg',
        continente: 'Europe',
        capital: 'Mariehamn',
      })
        .then(() => {
          return agent.get('/countries/:ALA')
            .expect(200);
        })
    });
    it('espera que se devuelva un objeto JSON', function () {
      return agent.get('/countries/:ARG')
        .expect('Content-Type', /json/);
    });
  });

  describe('POST /activity', function () {
    it('responde con 302', function () {
      return agent.post('/activity')
        .send({
          name: "Futbol",
          dificulty: "5",
          duration: "2 Horas",
          season: "Verano",
          countryId: "ARG"
        })
        .expect(302);
    });
    it('crea una actividad en la base de datos', function () {
      return agent.post('/activity')
        .send({
          name: "Futbol",
          dificulty: "5",
          duration: "2 Horas",
          season: "Verano",
          countryId: "ARG"
        })
        .then(() => {
          return Activity.findOne({
            where: {
              name: "Futbol"
            }
          });
        })
        .then(activity => {
          expect(activity).to.exist;
        });
    });
    it('setea correctamente la actividad en la base de datos', function () {
      return agent.post('/activity')
        .send({
          name: "Futbol",
          dificulty: "5",
          duration: "2 Horas",
          season: "Verano",
          countryId: "ARG"
        })
        .then(() => {
          return Activity.findOne({
            where: {
              name: "Futbol"
            },
            include: {
              model: Country
            }
          });
        })
        .then(activity => {
          expect(activity.countryId).to.equal('Argentina');
        });
    });
  });
});
