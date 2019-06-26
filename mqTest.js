var mq = require('ibmmq');

module.exports = {
    
    connectToMQ: function(mqServer, mqPort, queueManager, channel, queueName) {
        var config = {};
       
        config.MQC = mq.MQC; // Want to refer to this export directly for simplicity
    
        // The queue manager and queue to be used. These can be overridden on command line.
        config.qMgr = queueManager;
        config.qName = queueName;
        config.mqmd = new mq.MQMD(); // Defaults are fine.
        config.pmo = new mq.MQPMO();
        config.cd = new mq.MQCD();
        config.cno = new mq.MQCNO();
    
        //cd.ConnectionName = "localhost(1414)";
        config.cd.ConnectionName =  mqServer +"("+ mqPort +")"
        config.cd.ChannelName = channel;
        config.csp = new mq.MQCSP();
    
        config.cno.ClientConn = cd;  
        config.cno.Options = MQC.MQCNO_CLIENT_BINDING; // use MQCNO_CLIENT_BINDING to connect as client
        return config;
    },
    putMsg: function putMessage(hObj, config) {
      var msg = Buffer.from(JSON.stringify(coff));
      // Describe how the Put should behave
      config.pmo.Options = config.MQC.MQPMO_NO_SYNCPOINT |
                            config.MQC.MQPMO_NEW_MSG_ID |
                            config.MQC.MQPMO_NEW_CORREL_ID;
  
      mq.Put(hObj,config.mqmd,config.pmo,msg,function(err) {
        if (err) {
          console.log(formatErr(err));
        } else {
          console.log("MQPUT successful");
        }
      });
    },

    openConn:  function(config) {
      mq.Connx(config.qMgr, config.cno, function (err, hConn) {
      if (err) {
        console.log((err));
      } else {
        console.log("MQCONN to %s successful ", qMgr);
  
        // Define what we want to open, and how we want to open it.
        var od = new mq.MQOD();
        od.ObjectName = qName;
        od.ObjectType = MQC.MQOT_Q;
        var openOptions = MQC.MQOO_OUTPUT;
        mq.Open(hConn, od, openOptions, function (err, hObj) {
          if (err) {
            console.log(formatErr(err));
          } else {
            console.log("MQOPEN of %s successful", qName);
            putMessage(hObj);
          }
         // cleanup(hConn, hObj);
        });
      }
    });
  }
}