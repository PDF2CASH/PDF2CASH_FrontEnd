const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  publicRuntimeConfig: { // Will be available on both server and client
    invoiceHostDomain: process.env.INVOICE_DOMAIN !== undefined ? process.env.INVOICE_DOMAIN : 'http://localhost:8075/api/service/pdftoinvoice',  // Pass through env variables
    workerHostDomain: process.env.WORKER_DOMAIN !== undefined ? process.env.WORKER_DOMAIN : 'http://localhost:8075',
      parserHostDomain: process.env.PARSER_DOMAIN !== undefined ? process.env.PARSER_DOMAIN : 'http://localhost:10022/parser',
      frontHostDomain: process.env.FRONT_DOMAIN !== undefined ? process.env.FRONT_DOMAIN : 'http://localhost:3000'
  },
})
