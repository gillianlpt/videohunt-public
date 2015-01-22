// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
    'clientID' 		: 'your-secret-clientID-here', // your App ID
    'clientSecret' 	: 'your-client-secret-here', // your App Secret
    'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
  },

  'twitterAuth' : {
    'consumerKey' 		: 'lrv8Hu2sZ1BIoSY5VGPxYA6oS',
    'consumerSecret' 	: 'hWQ8uvIaRVbBgARthZlIS3PnAMcd66XmPpgSVxnPkOJeiUIcx3',
    'callbackURL' 		: 'http://127.0.0.1:3000/auth/twitter/callback'
  },

  'googleAuth' : {
    'clientID' 		: 'your-secret-clientID-here',
    'clientSecret' 	: 'your-client-secret-here',
    'callbackURL' 	: 'http://127.0.0.1:8080/auth/google/callback'
  }

};
