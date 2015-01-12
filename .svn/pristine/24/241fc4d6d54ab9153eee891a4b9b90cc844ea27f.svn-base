jingo.declare(
{
    require: 
    [
        "ages_3to6.controller.A36DisplayRecommendationsCommand",
        "ages_3to6.controller.A36DisplayThemeSelectionCommand"
    ],
    name: 'ages_3to6.controller.A36PrepControllerCommand',
    as: function() 
    {

        ages_3to6.controller.A36PrepControllerCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
        
        ages_3to6.controller.A36PrepControllerCommand.prototype = new puremvc.SimpleCommand;
        ages_3to6.controller.A36PrepControllerCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_3to6.controller.A36PrepControllerCommand.prototype.constructor = ages_3to6.controller.A36PrepControllerCommand;

        ages_3to6.controller.A36PrepControllerCommand.prototype.execute = function(notification)
        {
            console.log("ages_3to6.controller.A36PrepControllerCommand executed");
    
            //TODO: register other commands for user interactions
            this.facade.registerCommand(AppConstants.DISPLAY_RECOMMENDATIONS, ages_3to6.controller.A36DisplayRecommendationsCommand);
            this.facade.registerCommand(AppConstants.DISPLAY_THEME_SELECTION, ages_3to6.controller.A36DisplayThemeSelectionCommand);
        }
        
    }
});


