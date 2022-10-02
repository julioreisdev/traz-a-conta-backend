import companiesRepository from "../../src/repositories/companiesRepository";
import authServices from "../../src/services/authServices";
import companyFactory from "../factories/companyFactory";

describe("authService > createCompany", () => {
  it("Não cadastra company já cadastrada", async () => {
    const company = await companyFactory.validSchema();

    jest
      .spyOn(companiesRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return { ...company, id: 1 };
      });

    const response = authServices.createCompany(company);

    expect(response).rejects.toEqual({
      type: "conflict",
      message: "Already company with this e-mail",
    });
  });
  it("Cadastra company não cadastrada", async () => {
    const company = await companyFactory.validSchema();

    jest
      .spyOn(companiesRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(companiesRepository, "insert")
      .mockImplementationOnce((): any => {
        return {};
      });

    await authServices.createCompany(company);

    expect(companiesRepository.insert).toBeCalled();
  });
});
