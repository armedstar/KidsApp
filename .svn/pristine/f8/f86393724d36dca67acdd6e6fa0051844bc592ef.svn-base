jingo.declare(
{
    require: 
    [
        "shared.model.User"
    ],
    name: 'shared.model.remote.RemoteApplicationLoggingProxy',
    as: function() 
    {

        shared.model.ApplicationLoggingProxy = function()
        {
            puremvc.Proxy.apply(this, [shared.model.ApplicationLoggingProxy.NAME, new Array()]);
        }

        shared.model.ApplicationLoggingProxy.prototype = new puremvc.Proxy;
        shared.model.ApplicationLoggingProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.ApplicationLoggingProxy.prototype.constructor = shared.model.ApplicationLoggingProxy;
        
        shared.model.ApplicationLoggingProxy.NAME = "ApplicationLoggingProxy";

        shared.model.ApplicationLoggingProxy.prototype.logMessage = function(message)
        {
            this.logEvent(shared.model.ApplicationLoggingProxy.GENERIC_MESSAGE, message);
        }
              
        shared.model.ApplicationLoggingProxy.prototype.logEvent = function(eventCode, eventData)
        {
              var ApplicationLog = Parse.Object.extend("ApplicationLog");
              var myMessage = new ApplicationLog();
              var u = this.facade.getCurrentUser();
              if (u)
              myMessage.set("userId", this.facade.getCurrentUser().id);
              
              myMessage.set("familyId", this.facade.familyId);
              myMessage.set("applicationId", ApplicationFacade.APP_NAME);
              myMessage.set("eventCode", eventCode);
              myMessage.set("eventData", eventData);
              myMessage.set("localDeviceTime", getCurrentDateTimeStr());
              myMessage.save(null, {
                             success: function(message) {
                             },
                             error: function(message,err) {
                             console.log("Error logging to remote data store! " + err.message);
                             }
                             });
        }
              
        shared.model.ApplicationLoggingProxy.prototype.notifySMS = function(smsNumber, message)
        {
              console.log("CALLING NOTIFYSMS CLOUD CODE with " + smsNumber + " AND " + message);
              Parse.Cloud.run(
                              'notifySMS',
                              {
                              sms: smsNumber,
                              message: message
                              },
                              {
                              success: function(response) {
                                console.log(response);
                              },
                              error: function(err) {
                                console.log("Unable to send SMS message; err = " + err.message);
                              }
                              });
        }
    
    }
});