CESLoginUserCommand.prototype = new puremvc.SimpleCommand;

function CESLoginUserCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

CESLoginUserCommand.prototype.execute = function(notification)
{
    var username = notification.getBody().username;
    var password = notification.getBody().password;
    
    console.log("username = " + username);
    console.log("password = " + password);
    if (username && password)
    {
        var authProxy = this.facade.retrieveProxy(CESAuthenticationProxy.NAME);
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

CESLoginUserCommand.prototype.onLoginSuccess = function(user)
{
    this.sendNotification(AppConstants.LOG_APP_MESSAGE, {message: "User " + user.id + " (" + user.displayName + ") logged in."});
    this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: user});
}
