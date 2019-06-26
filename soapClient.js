var soap = require('soap');
var config = require("./config.json")

function testClient(server, port) {
    var url = `http://${server}:${port}/stockquote?wsdl`;
  
    var args = {TradePriceRequest: {
      tickerSymbol: 'value'
    }};
    
    soap.createClient(url, function(err, client) {
      client.GetLastTradePrice(args, function(err, result) {
          console.log(result);
      });
    });
}

testClient(config.stockServer, config.stockServerPort)
