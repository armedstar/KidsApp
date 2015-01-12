jingo.declare(
              {
              require:
              [
               "shared.model.ApplicationLoggingProxy"
               ],
              name: 'shared.controller.NotifyParentCommand',
              as: function() 
              {
                shared.controller.NotifyParentCommand = function()
                {
                    puremvc.SimpleCommand.apply(this, arguments);
                }
              
                shared.controller.NotifyParentCommand.prototype = new puremvc.SimpleCommand;
                shared.controller.NotifyParentCommand.prototype.parent = puremvc.SimpleCommand.prototype;
                shared.controller.NotifyParentCommand.prototype.constructor = shared.controller.NotifyParentCommand;
              
                shared.controller.NotifyParentCommand.prototype.execute = function(notification)
                {
                    
                    var parentSMS = notification.getBody().sms;
                    var message = notification.getBody().message;
                    var logProxy = this.facade.retrieveProxy(shared.model.ApplicationLoggingProxy.NAME);
                    if (logProxy && parentSMS && message)
                    {
                        logProxy.notifySMS(parentSMS, message);
                    }
                    
                }
              }
});