var http = require("http")
var soap = require("soap")
var express = require("express")
var bodyParser = require('body-parser')
var config = require("./config.json")

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

var xml = require('fs').readFileSync('stockquote.wsdl', 'utf8');

var app = express();
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(config.stockServerPort, function(){
    soap.listen(app, '/stockquote', myService, xml, function(){
      console.log('server initialized');
    });
});