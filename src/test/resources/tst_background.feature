# Feature: Background Feature

#     @setTenantByArgs
#     Scenario: The Background
#         # Select default or defined tenant
#         * def tenant = karate.properties['test.tenant'] != undefined ? karate.properties['test.tenant'] : defaultTenant        
#         * karate.log('Current tenant is: ' , tenant)        

#         # Replace wildcard with current tenant
#         * def auxURL = getURL
#         * replace auxURL
#             | token  | value  |
#             | tenant | tenant |

#         * karate.log('Current URL: ', auxURL)
        
#         # Authentication                
#         # * def defaultAuthMode = karate.properties['test.authmode'] != undefined ? karate.properties['test.authmode'] : defaultAuthMode
#         # # # * karate.log('Authentication mode: ' , defaultAuthMode)
#         # * def authHeader = call read('classpath:karate-auth.js')


#     @setTenantManually
#     Scenario: Set URL by tenant
#         * def testTenant = karate.properties['test.tenant']
#         * karate.log('Current tenant is: ' , testTenant)
#         * karate.log('Current cluster is: ' , tstCluster)
        
#         # Replace wildcard with current tenant        
#         * def auxURL = getURL
#         * replace auxURL
#             | token   | value      |
#             | tenant  | testTenant |
#             | cluster | tstCluster |

#         * karate.log('Current URL: ', auxURL)

#         # Authentication                
#         # * def defaultAuthMode = karate.properties['test.authmode'] != undefined ? karate.properties['test.authmode'] : defaultAuthMode
#         # # * karate.log('Authentication mode: ' , defaultAuthMode)
#         # * def authHeader = call read('classpath:karate-auth.js')
#         # * karate.log('authHeader: ', authHeader)
#         # * karate.configure('headers', authHeader);

#     @getAuthHeaderOnly
#     Scenario: Get Auth Header
#         * karate.log('Retrieve auth header')
#         * def defaultAuthMode = karate.properties['test.authmode'] != undefined ? karate.properties['test.authmode'] : defaultAuthMode
#         * def authHeader = callonce read('classpath:karate-auth.js')
#         # * def myHeader = authHeader
#         # * karate.configure('headers', { authHeader });
#         # * print (myHeader)
#         # * karate.configure('headers', authHeader);