jingo.declare(
{
    require: 
    [
        "shared.model.AuthenticationProxy"
    ],
    name: 'shared.controller.LogoutUserCommand',
    as: function() 
    {

        shared.controller.LogoutUserCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.LogoutUserCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.LogoutUserCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.LogoutUserCommand.prototype.constructor = shared.controller.LogoutUserCommand;

        shared.controller.LogoutUserCommand.prototype.execute = function(notification)
        {
            var currentUser = this.facade.getCurrentUser();
            var userId = currentUser.id;
            var name = this.facade.getCurrentUser().displayName;
            
            this.sendNotification(AppConstants.LOG_APP_MESSAGE, {eventCode: AppLoggingEventCodes.USER_LOGOUT, eventData: userId });
    
            var authProxy = this.facade.retrieveProxy(shared.model.AuthenticationProxy.NAME);
            if (authProxy)
            {
                authProxy.logoutUser();
            }
    
            if (notification.getBody().returnToLoginScreen)
            {
                this.sendNotification(AppConstants.DISPLAY_LOGIN, {});
            }
        }
        
    }
});