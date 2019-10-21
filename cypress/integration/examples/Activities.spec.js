import {
  genarateBaseURL,
  genarateUser
} from '../../common/commonAPI.js'

describe('[Activity] Test Activities', function() {
  var baseUrl, userLogged
  var user = genarateUser()

  before(async () => {
    baseUrl = await genarateBaseURL()
    cy.register(baseUrl, user.username, user.password)
    cy.login(baseUrl, user.username, user.password).then(response => {
      userLogged = response
    }).as('login')
  })

  it('Insert Activities', function() {
    cy.get('@login').should(response => {
      cy.request({
          method: 'POST',
          url: baseUrl + '/users/me/activities',
          headers: {
            Authorization: "Bearer " + userLogged.body.accessToken
          },
          timeout: 60000,
          failOnStatusCode: false,
          body: {
            _items: [{
                date: "2018-08-14",
                endTime: "2018-08-14T04:51:38.588Z",
                id: userLogged.body.uid + ":device:1534219200",
                sourceId: "D0F1030019",
                startTime: "2018-08-14T04:00:00.0Z",
                steps: 100,
                activeTime: 30,
                calories: 200,
                distance: 50,
                timezoneOffset: 25200
              },
              {
                date: "2018-08-13",
                endTime: "2018-08-13T04:51:38.588Z",
                id: userLogged.body.uid + ":device:1534132800",
                sourceId: "D0F1030019",
                startTime: "2018-08-13T04:00:00.0Z",
                steps: 100,
                activeTime: 30,
                calories: 200,
                distance: 50,
                timezoneOffset: 25200
              },
              {
                date: "2018-08-20",
                endTime: "2018-08-20T04:51:38.588Z",
                id: userLogged.body.uid + ":device:1534737600",
                sourceId: "D0F1030019",
                startTime: "2018-08-20T04:00:00.0Z",
                steps: 100,
                activeTime: 30,
                calories: 200,
                distance: 50,
                timezoneOffset: 25200
              },
              {
                date: "2018-08-21",
                endTime: "2018-08-21T04:51:38.588Z",
                id: userLogged.body.uid + ":device:1534824000",
                sourceId: "D0F1030019",
                startTime: "2018-08-21T04:00:00.0Z",
                steps: 100,
                activeTime: 30,
                calories: 200,
                distance: 50,
                timezoneOffset: 25200
              }
            ]
          }
        })
        .then((response) => {
          expect(response.status).to.eq(422)
          expect(response.body._result).to.deep.equal({
            nCreated: 0,
            nUpdated: 0,
            nDeleted: 0,
            nFailed: 4
          })
        })
    })
  })

  it('Cannot Insert Activities With Duplicated Id', function() {
    cy.request({
        method: 'POST',
        url: baseUrl + '/users/me/activities',
        headers: {
          Authorization: "Bearer " + userLogged.body.accessToken
        },
        timeout: 60000,
        body: {
          _items: [{
            date: "2018-08-14",
            endTime: "2018-08-14T04:51:38.588Z",
            id: userLogged.body.uid + ":device:1534219200",
            sourceId: "D0F1030019",
            startTime: "2018-08-14T04:00:00.0Z",
            steps: 100,
            activeTime: 30,
            calories: 200,
            distance: 50,
            timezoneOffset: 25200
          }]
        },
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(422)
        expect(response.body._result).to.deep.equal({
          nCreated: 0,
          nUpdated: 0,
          nDeleted: 0,
          nFailed: 1
        })
        expect(response.body._items[0]).to.deep.equal({
          _error: 409001,
          _errorMessage: 'Duplicate key error'
        })
      })
  })

  it('Cannot Insert Activities If Start Time Greater Than End Time', function() {
    cy.request({
        method: 'POST',
        url: baseUrl + '/users/me/activities',
        headers: {
          Authorization: "Bearer " + userLogged.body.accessToken
        },
        timeout: 60000,
        body: {
          _items: [{
            date: "2018-08-14",
            endTime: "2018-08-14T01:51:38.588Z",
            id: userLogged.body.uid + ":device:1534219200",
            sourceId: "D0F1030019",
            startTime: "2018-08-14T04:00:00.0Z",
            steps: 100,
            activeTime: 30,
            calories: 200,
            distance: 50,
            timezoneOffset: 25200
          }]
        },
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(422)
        expect(response.body._result).to.deep.equal({
          nCreated: 0,
          nUpdated: 0,
          nDeleted: 0,
          nFailed: 1
        })
        expect(response.body._items[0]).to.deep.equal({
          _error: 400002,
          _errorMessage: 'Input form is invalid',
          _errorDetails: {
            startTime: 'startTime must be less than EndTime'
          }
        })
      })
  })

  const data = [{
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":15332028",
    steps: 520,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      id: "id must satisfy the pattern '[uid]:device:[start-time-in-second-timestamp]'"
    }
  }, {
    id: ":device:1534219200",
    steps: -1,
    activeTime: 10,
    calories: 2000,
    distance: 100,
    timezoneOffset: 25200,
    _errorDetails: {
      steps: "steps must be 0 or greater"
    }
  }].forEach(item => {
    it('Verify Insert Activities With Invalid Body (Invalid Range Type)',
      function() {
        cy.request({
          method: 'POST',
          url: baseUrl + '/users/me/activities',
          headers: {
            Authorization: "Bearer " + userLogged.body.accessToken
          },
          timeout: 60000,
          body: {
            _items: [{
              date: "2018-08-14",
              endTime: "2018-08-14T09:51:38.588Z",
              id: userLogged.body.uid + item.id,
              sourceId: "D0F1030019",
              startTime: "2018-08-14T04:00:00.0Z",
              steps: item.steps,
              activeTime: item.activeTime,
              calories: item.calories,
              distance: item.distance,
              timezoneOffset: item.timezoneOffset
            }]
          },
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.eq(422)
          expect(response.body._result).to.deep.equal({
            nCreated: 0,
            nUpdated: 0,
            nDeleted: 0,
            nFailed: 1
          })
          expect(response.body._items[0]).to.deep.equal({
            _error: 400002,
            _errorMessage: 'Input form is invalid',
            _errorDetails: item._errorDetails
          })
        })
      }
    )
  })

  it('Delete User', function() {
    cy.request({
        method: 'DELETE',
        url: baseUrl + '/users/me',
        headers: {
          Authorization: "Bearer " + userLogged.body.accessToken,
          locale: 'en'
        }
      })
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.equal({
          id: userLogged.body.uid
        })
      })
  })

})
