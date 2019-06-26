var soap = require('soap');
  var url = 'http://localhost:8001/stockquote?wsdl';
  
  var args = {TradePriceRequest: {
    tickerSymbol: 'value'
  }};
  
  soap.createClient(url, function(err, client) {
    client.GetLastTradePrice(args, function(err, result) {
        console.log(result);
    });
});