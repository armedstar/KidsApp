jingo.declare(
{
    require: 
    [
        "shared.model.ApplicationLoggingProxy"
    ],
    name: 'shared.controller.SendAppLogMessageCommand',
    as: function() 
    {

        shared.controller.SendAppLogMessageCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.SendAppLogMessageCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.SendAppLogMessageCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.SendAppLogMessageCommand.prototype.constructor = shared.controller.SendAppLogMessageCommand;

        shared.controller.SendAppLogMessageCommand.prototype.execute = function(notification)
        {
            if (APPLICATION_LOGGING_ENABLED && notification.getBody())
            {
                var message = notification.getBody().message;
                var eventCode = notification.getBody().eventCode;
                var eventData = notification.getBody().eventData;
                var logProxy = this.facade.retrieveProxy(shared.model.ApplicationLoggingProxy.NAME);
              
                if (logProxy && message)
                    logProxy.logMessage(message);
                else if (logProxy && eventCode && eventData)
                    logProxy.logEvent(eventCode, eventData);
            }
        }
        
    }
});