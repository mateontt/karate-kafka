function fn(auth) {

    // karate.log('karate_auth - auth', auth)

    // var credentials = karate.merge(auth || {});
    // get password from system properties
    // credentials.username = credentials.username || karate.get('defaultUsername');
    // credentials.password = credentials.password || karate.get('credentials', {})[credentials.username];
    // credentials.authMode = credentials.authMode || karate.get('defaultAuthMode');

    // credentials.username = karate.properties["karate.username"] // || karate.get('defaultUsername');
    // credentials.password = karate.properties["karate.password"] //|| karate.get('credentials', {})[credentials.username];
    // credentials.authMode = "basic" // credentials.authMode || karate.get('defaultAuthMode');

    // karate.properties['test.authmode']
    //
    //
    //
    // LET ALWAYS COMMENTED. USE ONLY IN LOCAL DEBUG !!
    // karate.log('credentials.username', credentials.username)
    // karate.log('credentials.password', credentials.password)
    // karate.log('credentials.authMode: ', credentials.authMode)
    //
    //
    //
    //
    


    // if (credentials.authMode == null || credentials.authMode === 'none' || credentials.username == null) {
    //     return null;
    // }

    // if (credentials.authMode !== 'jwt' && credentials.password == null && credentials.username !== 'guest') {
    //     karate.log('Trying to authenticate with no username. Aborting. credentials:', credentials);
    //     karate.abort();
    // }

    // // returns basic auth header
    // var basicAuth = function(credentials) {
    //     var temp = credentials.username + ':' + credentials.password;
    //     var Base64 = Java.type('java.util.Base64');
	// 	    var String = Java.type('java.lang.String');
    //     var encoded = Base64.getEncoder().encodeToString(new String(temp).getBytes('utf-8'));
    //     return { Authorization: 'Basic ' + encoded };
    // };

    // // returns janus auth header
    // var janusAuth = function(credentials) {
    //     var authHeadersCache = karate.properties['authHeadersCache'] || {};
    //     var authHeader = authHeadersCache[credentials.username];

    //     if (!authHeader) {
    //         var basicAuthHeader = basicAuth(credentials);
    //         var authResponse = karate.call('classpath:karate-auth.feature@fetchJanusAuthHeader', basicAuthHeader);


    //         //karate.log('authResponse', authResponse)
    //         // authHeadersCache[credentials.username] = authResponse.responseHeaders['access-token']
    //         // ? authResponse.responseHeaders['access-token'][0]
    //         // : null;
    //         authResponse.responseHeaders['access-token'] = authResponse.responseHeaders['access-token']? authResponse.responseHeaders['access-token']: [""];
    //         authHeadersCache[credentials.username] = authResponse.responseHeaders['access-token'][0]? authResponse.responseHeaders['access-token'][0]: null;
    //     }      

    //     // If the user is unauthorized, any auth token must be return:
    //     if (authHeadersCache[credentials.username] == null) {
    //       return null;
    //     }
    //     else {
    //     //   karate.configure('headers', bg_mecnotgc.authHeader);  
    //       karate.properties['authHeadersCache'] = authHeadersCache;
    //       return { Authorization: 'Bearer ' + authHeadersCache[credentials.username] };
    //     }
    // };

    // // returns janus internal jwt auth header
    // var janusEchoAuth = function(credentials) {
    //     var echoAuthHeadersCache = karate.properties['echoAuthHeadersCache'] || {};
    //     var authHeader = echoAuthHeadersCache[credentials.username];
    //     if (!authHeader) {
    //         var janusAuthHeaders = janusAuth(credentials);
    //         var authResponse = karate.call('classpath:karate-auth.feature@echoJanusJwtToken', janusAuthHeaders);
    //         // karate.log('authResponse', authResponse);
    //         echoAuthHeadersCache[credentials.username] = authResponse.responseHeaders['access-token']
    //         ? authResponse.responseHeaders['access-token'][0]
    //         : null;
    //     }
    //     karate.properties['echoAuthHeadersCache'] = echoAuthHeadersCache;
    //     return { Authorization: 'Bearer ' + echoAuthHeadersCache[credentials.username] };
    // };

    // // returns wcToken auth headers
    // var wcTokenAuth = function (credentials) {
    //     var storeId = karate.get('auth.storeId') || karate.get('storeId')
    //     var sessionHeadersCache = karate.properties['wcTokenSessionsCache'] || {};
    //     // karate.log('sessionHeadersCache IN', sessionHeadersCache)
    //     karate.properties['wcTokenSessionsCache'] = sessionHeadersCache;
    //     var sessionHeaders = sessionHeadersCache[storeId  + ' ' + credentials.username];
    //     if (!sessionHeaders) {
    //         var response = karate.call('classpath:karate-auth.feature@wcGuestToken', { storeId: storeId });
    //         // karate.log('guest response.wscSession', response.wscSession)
    //         sessionHeaders = sessionHeadersCache[storeId  + ' ' + credentials.username] = response.wscSession;
    //         if (credentials.username !== 'guest') {
    //             var response = karate.call('classpath:karate-auth.feature@wcIdentityToken', { auth: credentials, storeId: storeId, sessionHeaders: sessionHeaders});
    //             // karate.log('identity response.wscSession', response.wscSession)
    //             sessionHeaders = sessionHeadersCache[storeId  + ' ' + credentials.username] = response.wscSession;
    //         }
    //         karate.write(karate.pretty(sessionHeadersCache), 'wcTokenSessionsCache.json');
    //     }
    //     // karate.log('sessionHeadersCache OUT', sessionHeadersCache)
    //     karate.properties['wcTokenSessionsCache'] = sessionHeadersCache;
    //     return sessionHeaders;
    // };

    // // returns jwt auth header
    // var jwtAuth = function(credentials) {
    //     var readFile = function(filename) {
    //         try {
    //             return karate.read(filename);
    //         } catch (e) {
    //             return null;
    //         }
    //     }
    //     var defaultJwt = readFile('classpath:jwt/default-jwt.yml');
    //     var userJwt = readFile('classpath:jwt/' + credentials.username + '-jwt.yml');
    //     var jwtData = {
    //         secret: defaultJwt.secret,
    //         headers: karate.merge(defaultJwt.headers, userJwt.headers || {}),
    //         payloads: karate.merge(defaultJwt.payloads, userJwt.payloads || {})
    //     }
    //     var jwtUtils = Java.type('com.inditex.merlin.utils.jwt.JWTUtil');
    //     var jwt = jwtUtils.generateToken(jwtData);
    //     return { Authorization: 'Bearer ' + jwt };
    // };


    // var authModes = {
    //     basic: basicAuth,
    //     janus: basicAuth,       //janusAuth,
    //     janusEcho: basicAuth,   //janusEchoAuth,
    //     jwt: basicAuth,         //jwtAuth,
    //     wcToken: basicAuth      //wcTokenAuth
    // };


    // var authModeFunction = authModes[credentials.authMode];

    // // calls auth function and return auth header
    // return authModeFunction ? authModeFunction(credentials) : null;
    return null;
}
