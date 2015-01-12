CESLogoutUserCommand.prototype = new puremvc.SimpleCommand;

function CESLogoutUserCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

CESLogoutUserCommand.prototype.execute = function(notification)
{
    var currentUser = this.facade.getCurrentUser();
    var userId = currentUser.id;
    var name = this.facade.getCurrentUser().displayName;
    this.sendNotification(AppConstants.LOG_APP_MESSAGE, {message: "User " + userId + " (" + name + ") logged out."});
    
    var authProxy = this.facade.retrieveProxy(CESAuthenticationProxy.NAME);
    if (authProxy)
    {
        authProxy.logoutUser();
    }
    
    if (notification.getBody().returnToLoginScreen)
    {
        this.sendNotification(AppConstants.DISPLAY_LOGIN, {});
    }
}