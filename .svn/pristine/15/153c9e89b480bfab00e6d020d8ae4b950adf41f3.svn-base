includeJS("js/ces/view/mediator/CESLoginPageMediator.js");

CESDisplayLoginCommand.prototype = new puremvc.SimpleCommand;

function CESDisplayLoginCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

CESDisplayLoginCommand.prototype.execute = function(notification)
{
    console.log("CESDisplayLoginCommand executed");
    console.log("Notification body: " + notification.getBody());
    
    if (this.facade.familyId)
    {
        console.log('Family ID ALREADY SET');
        this.getFamilyId(this.facade.familyId);
    }
    else
    {
        if (DEVICE_MODE_ENABLED)
        {
            window.plugins.ApplicationPreferences.get('family_id', Relegate.create(this, this.getFamilyId, this), function() {alert('Unable to get family id.  Make sure the value is set in the Settings application.');});
        }
        else
        {  
            this.getFamilyId("OFF_DEVICE_1234");
        }
    }
    
}

CESDisplayLoginCommand.prototype.getFamilyId = function(famId)
{
    this.facade.familyId = famId;
    var authProxy = this.facade.retrieveProxy(CESAuthenticationProxy.NAME);
    if (authProxy)
    {
        authProxy.getRegisteredUsers(famId, Relegate.create(this, this.getRegisteredUsersCallback, this));
    }
}

CESDisplayLoginCommand.prototype.getRegisteredUsersCallback = function(regUsersArr)
{
    if (regUsersArr)
    {
        var loginPageMediator = this.facade.retrieveMediator(CESLoginPageMediator.NAME);
        this.sendNotification(AppConstants.SHOW_PAGE, {pageMediator: loginPageMediator, userData: null, pageData: regUsersArr});
    }
    
}