var http = require("http")
var soap = require("soap")
var express = require("express")
var bodyParser = require('body-parser')

var myService = {
    StockQuoteService: {
        StockQuotePort: {
            GetLastTradePrice: function(args) {
                console.log("called GetLastTradePrice")
                var finalPrice = 0.0;
                if (args.TradePriceRequest.tickerSymbol == "value"){
                    finalPrice = 100.0;
                }
                return {
                    price: finalPrice
                };
            },

        }
    }
};

var xml = require('fs').readFileSync('myService.wsdl', 'utf8');

//http server example
var server = http.createServer(function(request,response) {
    response.end('404: Not Found: ' + request.url);
});

// server.listen(8000);
// soap.listen(server, '/wsdl', myService, xml, function(){
//   console.log('server initialized');
// });

//express server example
var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/stockquote', myService, xml, function(){
      console.log('server initialized');
    });
});