jingo.declare(
{
    require: 
    [
        "shared.model.User"
    ],
    name: 'shared.model.local.LocalApplicationLoggingProxy',
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
              this.logEvent(AppLoggingEventCodes.GENERIC_MESSAGE, message);
        }
              
        shared.model.ApplicationLoggingProxy.prototype.logEvent = function(eventCode, eventData)
        {
              var u = this.facade.getCurrentUser();
              
              var userId = (u) ? u.id : "<no user>";
              var familyId = this.facade.familyId;
              var applicationId = ApplicationFacade.APP_NAME;
              var localDeviceTime = getCurrentDateTimeStr();
              
              console.log("ApplicationLoggingProxy.logMessage(): LOG: " +
                          "userId = " + userId +
                          "; familyId = " + familyId +
                          "; applicationId = " + applicationId +
                          "; localDeviceTime = " + localDeviceTime);
        }
              
        shared.model.ApplicationLoggingProxy.prototype.notifySMS = function(smsNumber, message)
        {
              console.log("ApplicationLoggingProxy.notifySMS(): SMS: " + smsNumber + " MESSAGE: " + message);
        }
        
    }
});