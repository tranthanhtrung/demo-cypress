exports.genarateUser = () => {
  return {
    username: "autotestfossil+" + Date.now() + "@gmail.com",
    password: "misfit1"
  }
}

exports.genarateBaseURL = async () => {
  const fileURL = await cy.readFile('hostURL.json')
  return fileURL[Cypress.env('BRAND')][Cypress.env('ENV')] + '/' + Cypress.env('apiVersion')
}
