import supertest from "supertest";
import app from "../../src/app";
import companyFactory from "../factories/companyFactory";

describe("POST em /companies/register", () => {
  it("Retorna 422 ao enviar dados inválidos.", async () => {
    const company = await companyFactory.invalidSchema();
    const response = await supertest(app)
      .post("/companies/register")
      .send(company);
    expect(response.status).toBe(422);
  });
  it("Retorna 201 ao cadastrar company.", async () => {
    const company = await companyFactory.validSchema();
    const response = await supertest(app)
      .post("/companies/register")
      .send(company);
    expect(response.status).toBe(201);
  });
  it("Retorna 409 ao tentar cadastrar company já cadastrada.", async () => {
    const company = await companyFactory.validSchema();
    await supertest(app).post("/companies/register").send(company);
    const response = await supertest(app)
      .post("/companies/register")
      .send(company);
    expect(response.status).toBe(409);
  });
});
