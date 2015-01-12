jingo.declare(
{
    require: 
    [
        "shared.model.AuthenticationProxy",
        "shared.view.mediator.LoginPageMediator"
    ],
    name: 'shared.controller.DisplayLoginCommand',
    as: function() 
    {

        shared.controller.DisplayLoginCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        shared.controller.DisplayLoginCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.DisplayLoginCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.DisplayLoginCommand.prototype.constructor = shared.controller.DisplayLoginCommand;

        shared.controller.DisplayLoginCommand.prototype.execute = function(notification)
        {
            console.log("shared.controller.DisplayLoginCommand executed");
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

        shared.controller.DisplayLoginCommand.prototype.getFamilyId = function(famId)
        {
            this.facade.familyId = famId;
            var authProxy = this.facade.retrieveProxy(shared.model.AuthenticationProxy.NAME);
            if (authProxy)
            {
                authProxy.getRegisteredUsers(famId, Relegate.create(this, this.getRegisteredUsersCallback, this));
            }
        }

        shared.controller.DisplayLoginCommand.prototype.getRegisteredUsersCallback = function(regUsersArr)
        {
            if (regUsersArr)
            {
                var loginPageMediator = this.facade.retrieveMediator(shared.view.mediator.LoginPageMediator.NAME);
                this.sendNotification(AppConstants.SHOW_PAGE, {pageMediator: loginPageMediator, userData: null, pageData: regUsersArr});
            }
    
        }
    
    }
});