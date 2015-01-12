includeJS("js/ces/controller/CESDisplayRecommendationsCommand.js");
includeJS("js/ces/controller/CESDisplayLoginCommand.js");
includeJS("js/ces/controller/CESLoginUserCommand.js");
includeJS("js/ces/controller/CESLogoutUserCommand.js");
includeJS("js/shared/controller/SendAppLogMessageCommand.js");
includeJS("js/shared/controller/SendProgramHistoryEventCommand.js");

CESPrepControllerCommand.prototype = new puremvc.SimpleCommand;

function CESPrepControllerCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

CESPrepControllerCommand.prototype.execute = function(notification)
{
    console.log("CESPrepControllerCommand executed");
    
    //TODO: register other commands for user interactions
    this.facade.registerCommand(AppConstants.DISPLAY_RECOMMENDATIONS, CESDisplayRecommendationsCommand);
    this.facade.registerCommand(AppConstants.DISPLAY_LOGIN, CESDisplayLoginCommand);
    this.facade.registerCommand(AppConstants.LOGIN_USER, CESLoginUserCommand);
    this.facade.registerCommand(AppConstants.LOGOUT_USER, CESLogoutUserCommand);
    this.facade.registerCommand(AppConstants.LOG_APP_MESSAGE, SendAppLogMessageCommand);
    this.facade.registerCommand(AppConstants.SEND_PROGRAM_HISTORY_EVENT, SendProgramHistoryEventCommand);
}


