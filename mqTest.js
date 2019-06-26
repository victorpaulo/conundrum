
    var mq = require('ibmmq');
    var MQC = mq.MQC; // Want to refer to this export directly for simplicity
  
    // The queue manager and queue to be used. These can be overridden on command line.
    var qMgr = "QM1";
    var qName = "soa.log";
    var mqmd = new mq.MQMD(); // Defaults are fine.
    var pmo = new mq.MQPMO();
    var cd = new mq.MQCD();
    var cno = new mq.MQCNO();
  
    cd.ConnectionName = "localhost(1414)";
    cd.ChannelName = "CHAN1";
    var csp = new mq.MQCSP();
  
    cno.ClientConn = cd;  
    cno.Options = MQC.MQCNO_CLIENT_BINDING; // use MQCNO_CLIENT_BINDING to connect as client
  
    function putMessage(hObj) {
      var msg = Buffer.from(JSON.stringify(coff));
      // Describe how the Put should behave
      pmo.Options = MQC.MQPMO_NO_SYNCPOINT |
                    MQC.MQPMO_NEW_MSG_ID |
                    MQC.MQPMO_NEW_CORREL_ID;
  
      mq.Put(hObj,mqmd,pmo,msg,function(err) {
        if (err) {
          console.log(formatErr(err));
        } else {
          console.log("MQPUT successful");
        }
      });
    }
    mq.Connx(qMgr, cno, function (err, hConn) {
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
