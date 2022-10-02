import { faker } from "@faker-js/faker";

async function validSchema() {
  return {
    name: faker.lorem.words(2),
    email: faker.internet.email(),
    url: faker.internet.url(),
    password: faker.lorem.words(2),
  };
}

async function invalidSchema() {
  return {};
}

const companyFactory = {
  validSchema,
  invalidSchema,
};

export default companyFactory;
