jingo.declare(
{
    require: 
    [
        "shared.controller.DisplayLoginCommand",
        "shared.controller.LoginUserCommand",
        "shared.controller.LogoutUserCommand",
        "shared.controller.SendAppLogMessageCommand",
        "shared.controller.NotifyParentCommand",
        "shared.controller.SendProgramHistoryEventCommand"
    ],
    name: 'shared.controller.PrepControllerCommand',
    as: function() 
    {

        shared.controller.PrepControllerCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.PrepControllerCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.PrepControllerCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.PrepControllerCommand.prototype.constructor = shared.controller.PrepControllerCommand;

        shared.controller.PrepControllerCommand.prototype.execute = function(notification)
        {
            console.log("PrepController executed");
    
            //TODO: register other commands for user interactions
            this.facade.registerCommand(AppConstants.DISPLAY_LOGIN, shared.controller.DisplayLoginCommand);
            this.facade.registerCommand(AppConstants.LOGIN_USER, shared.controller.LoginUserCommand);
            this.facade.registerCommand(AppConstants.LOGOUT_USER, shared.controller.LogoutUserCommand);
            this.facade.registerCommand(AppConstants.LOG_APP_MESSAGE, shared.controller.SendAppLogMessageCommand);
            this.facade.registerCommand(AppConstants.NOTIFY_PARENT, shared.controller.NotifyParentCommand);
            this.facade.registerCommand(AppConstants.SEND_PROGRAM_HISTORY_EVENT, shared.controller.SendProgramHistoryEventCommand);
        }
        
    }
});


