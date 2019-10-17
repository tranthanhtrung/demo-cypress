import {
  genarateEmail,
  genarateBaseURL
} from '../../common/genarateEmail'
describe('My fisrt test', function() {
  var baseUrl
  before(async () => {
    baseUrl = await genarateBaseURL()
  })
  it('Do something', function() {
    cy.request({
        method: 'POST',
        url: baseUrl + '/rpc/auth/login',
        body: {
          email: "autotestfossil+1997@gmail.com",
          password: "misfit1"
        }
      })
      .then((response) => {
        cy.log(response.body);
      })

  })
})
