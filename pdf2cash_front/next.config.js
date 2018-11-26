const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  publicRuntimeConfig: { // Will be available on both server and client
    invoiceHostDomain: process.env.INVOICE_DOMAIN !== undefined ? process.env.INVOICE_DOMAIN : 'http://localhost:8000',  // Pass through env variables
    workerHostDomain: process.env.WORKER_DOMAIN !== undefined ? process.env.WORKER_DOMAIN : 'http://localhost:8075',
  },
})
