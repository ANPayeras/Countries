const { Country, Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Model Testing', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Country Model', () => {
    beforeEach(async () => {
      return await Country.sync({ force: true }); //Antes de ejecutar cada uno lo vuelve a sincronizar
    })

    describe('id', () => {
      it('should throw an error if id is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid id', () => {
        return Country.create({
          id: 'ARG',
          name: 'Argentina',
          flagimage: '',
          continente: 'America',
          capital: 'Buenos Aires',
        })
          .then(country => {
            expect(country.id.length).to.equal(3);
          })
      });
    });

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });

    describe('flagimage', () => {
      it('should throw an error if flagimage is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid flagimage')))
          .catch(() => done());
      });
    });

    describe('continente', () => {
      it('should throw an error if continente is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid continente')))
          .catch(() => done());
      });
      it('should work when its a valid continente', () => {
        Country.create({ continente: 'Americas' });
      });
    });

    describe('capital', () => {
      it('should throw an error if capital is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid capital')))
          .catch(() => done());
      });
      it('should work when its a valid capital', () => {
        Country.create({ capital: 'Buenos Aires' });
      });
    });
  });

  describe('Activity Model', () => {
    beforeEach(async () => {
      return await Activity.sync({ force: true }); //Antes de ejecutar cada uno lo vuelve a sincronizar
    })

    describe('dificulty', () => {
      it('should throw an error if dificulty is not a Number', () => {
        Activity.create({
          id: 1,
          name: 'Futbol',
          dificulty: 1,
          season: 'Verano',
        })
          .then(activity => {
            expect(typeof activity.dificulty).to.equal(Number);
          })
      });

      it('should throw an error if dificulty is an incorrect value', () => {
        Activity.create({
          id: 1,
          name: 'Futbol',
          dificulty: 2,
          season: 'Verano',
        })
          .then(activity => {
            expect(activity.dificulty >= 1).to.equal(true);
            expect(activity.dificulty <= 5).to.equal(true);
          })
      });
    });

    describe('season', () => {
      it('should throw an error if season is an incorrect value', () => {
        Activity.create({
          id: 1,
          name: 'Futbol',
          dificulty: 2,
          season: 'as',
        })
          .then(activity => {
            expect(activity.season).to.equal('Verano');
          })
      });
    });
  });
});
