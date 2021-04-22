/*
 * Netlify function to calculate sales tax for the API demo
 * https://developers.taxjar.com/demo/
 */
const Taxjar = require('taxjar');

exports.handler = async function(event, context) {
  const client = new Taxjar({
    apiKey: process.env.DEMO_API_TOKEN
  });

  client.setApiConfig('headers', {
    'User-Agent': 'TaxJarAPIDemo/1.0'
  });

  const headers = {
    'Access-Control-Allow-Origin': process.env.DEMO_ALLOW_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTION'
  };

  let res = {};

  try {
    res = await client.taxForOrder(event.body);
  } catch (err) {
    return {
      statusCode: err.status,
      headers: headers,
      body: JSON.stringify({
        error: err.error,
        detail: err.detail
      })
    };
  }

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(res)
  };
};
