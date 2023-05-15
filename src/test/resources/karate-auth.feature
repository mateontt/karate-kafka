# @ignore
# Feature: Karate Auth / Login

# Background:

# @fetchJanusAuthHeader
# Scenario: fetchJanusAuthHeader
#     * def authHeaders = __arg
#     Given url urls.janusAuthUrl
#     Given path '/authenticate'
#     And headers authHeaders
#     And request ''
#     When method POST
#     # * print 'access-token', responseHeaders['access-token']

# @echoJanusJwtToken
# Scenario: echoJanusJwtToken
#     * def authHeaders = __arg
#     Given url urls.janusAuthUrl
#     Given path '/mecjamba/echo'
#     And headers authHeaders
#     And request ''
#     When method POST
#     # * print 'access-token', responseHeaders['access-token']

# @wcGuestToken
# Scenario: wscGuestToken
#     Given url url.wcAuthUrl
#     And path '/1/user/store/' + __arg.storeId + '/guest-identity'
#     And request ''
#     When method POST
#     Then status 201

#     # * match response.identity.kind == 'guest'
#     # * match response.rueiData.OperationRUEI contains  'user-login-guest'

#     * def wscSession =
#     """
#     {
#         userId: #(response.identity.userId),
#         wcToken: #(response.identity.WCToken),
#         wcTrustedToken: #(response.identity.WCTrustedToken),
#     }
#     """

# @wcIdentityToken
# Scenario: wscIdentityToken
#     Given headers __arg.sessionHeaders
#     Given header Content-Type = 'application/json'
#     Given url url.wcAuthUrl
#     And path '/1/user/store/' + __arg.storeId + '/identity'
#     And request { 'email': "#(__arg.auth.username)", "password": "#(__arg.auth.password)" }
#     When method POST
#     Then status 201

#     # * assert response.identity.kind == 'registered'
#     # * match response.rueiData.OperationRUEI contains  'user-login'

#     * def wscSession =
#     """
#     {
#         userId: #(response.identity.userId),
#         wcToken: #(response.identity.WCToken),
#         wcTrustedToken: #(response.identity.WCTrustedToken),
#     }
#     """
