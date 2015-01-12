includeJS("js/ces/controller/CESStartupCommand.js");

ApplicationFacade.prototype = new puremvc.Facade;
ApplicationFacade.prototype.parent = puremvc.Facade.prototype;
ApplicationFacade.prototype.constructor = ApplicationFacade;

ApplicationFacade.prototype.familyId = null;

ApplicationFacade.APP_NAME = "PLAYSKOOL-CES";

function ApplicationFacade(key)
{
    puremvc.Facade.apply(this, arguments);
    this.familyId = null;
}

ApplicationFacade.getInstance = function(key)
{
    if (!puremvc.Facade.hasCore(key))
    {
        new ApplicationFacade(key);
    }
    var retVal = puremvc.Facade.getInstance(key);
    return retVal;
}

ApplicationFacade.prototype.startup = function()
{
    this.sendNotification(AppConstants.STARTUP);
}

ApplicationFacade.prototype.initializeController = function()
{
	puremvc.Facade.prototype.initializeController.call(this);
	this.registerCommand(AppConstants.STARTUP, CESStartupCommand);
}

ApplicationFacade.prototype.getCurrentUser = function()
{
    var user = null;
    
    var authProxy = this.retrieveProxy(CESAuthenticationProxy.NAME);
    if (authProxy)
    {
        user = authProxy.getCurrentUser();
    }
    return user;
}