exports.genarateEmail = () => {
  console.log("Email")
  return 'tranthanhtrung';
}

exports.genarateBaseURL = async () => {
  var fileURL = await cy.readFile('hostURL.json')
  return fileURL[Cypress.env('BRAND')][Cypress.env('ENV')] + '/' + Cypress.env('apiVersion')
}
