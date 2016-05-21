'use strict'

const cipherjson = require('cipherjson')

let cipher = cipherjson('your-password')

cipher.write('secret.json', {
  DATABASE_PASSWORD: 'asekr324',
  EXTERNAL_API_SECRET: 'puaALiJ'
}).then(() => {
  /* ... */

  cipher.read('secret.json').then((data) => {
    /* ... */
  })
})

