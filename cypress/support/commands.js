// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('register', function(baseUrl, username, password) {
  return cy.request({
    method: 'POST',
    url: baseUrl + '/rpc/auth/register',
    body: {
      email: username,
      password: password,
      firstName: "test",
      lastName: "fossil",
      gender: "M",
      diagnosticEnabled: true,
      birthday: "1980-01-01"
    }
  }).then(response => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('login', function(baseUrl, username, password) {
  return cy.request({
    method: 'POST',
    url: baseUrl + '/rpc/auth/login',
    body: {
      email: username,
      password: password
    }
  }).then(response => {
    expect(response.status).to.eq(200)
  })
})
