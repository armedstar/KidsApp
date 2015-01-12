jingo.declare(
{
    require: 
    [
        "shared.model.AuthenticationProxy"
    ],
    name: 'shared.controller.LoginUserCommand',
    as: function() 
    {

        shared.controller.LoginUserCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.LoginUserCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.LoginUserCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.LoginUserCommand.prototype.constructor = shared.controller.LoginUserCommand;

        shared.controller.LoginUserCommand.prototype.execute = function(notification)
        {
            var username = notification.getBody().username;
            var password = notification.getBody().password;
    
            console.log("username = " + username);
            console.log("password = " + password);
            if (username && password)
            {
                var authProxy = this.facade.retrieveProxy(shared.model.AuthenticationProxy.NAME);
                if (authProxy)
                {
                    authProxy.loginUser(
                        username, 
                        password, 
                        Relegate.create(this, this.onLoginSuccess, this), 
                        function(user,err) { alert('Unable to login user ' + username + ': ' + err.message); });
                }
            }
        }

        shared.controller.LoginUserCommand.prototype.onLoginSuccess = function(user)
        {
            this.sendNotification(AppConstants.LOG_APP_MESSAGE, {eventCode: AppLoggingEventCodes.USER_LOGIN, eventData: user.id });
            this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: user});
        }
        
    }
});
