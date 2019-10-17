describe('My fisrt test', function () {
	it('Do something', function () {
		cy.request({
			method: 'POST',
			url: 'https://c-portfolio-int.misfit.com/v2/rpc/auth/login',
			body: {
				email: "autotestfossil+1997@gmail.com",
				password: "misfit1"
			}
		})
		.then((response) => {
          	expect(response.status).to.eq(200);
          	expect(response.body.accessTokenExpiresIn).to.eq(800);
          	cy.log(response.body);
       })

	})
})

describe('My fisrt test', function () {
	it('Do something', function () {
		cy.request({
			method: 'POST',
			url: 'https://c-portfolio-int.misfit.com/v2/rpc/auth/login',
			body: {
				email: "autotestfossil+1997@gmail.com",
				password: "misfit1"
			}
		})
		.then((response) => {
          	expect(response.status).to.eq(200);
          	expect(response.body.accessTokenExpiresIn).to.eq(1800);
          	cy.log(response.body);
       })

	})
})