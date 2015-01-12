jingo.declare(
{
    require: 
    [
        "ages_all.controller.AADisplayRecommendationsCommand",
        "ages_all.controller.AADisplayThemeSelectionCommand"
    ],
    name: 'ages_all.controller.AAPrepControllerCommand',
    as: function() 
    {

        ages_all.controller.AAPrepControllerCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
        
        ages_all.controller.AAPrepControllerCommand.prototype = new puremvc.SimpleCommand;
        ages_all.controller.AAPrepControllerCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_all.controller.AAPrepControllerCommand.prototype.constructor = ages_all.controller.AAPrepControllerCommand;

        ages_all.controller.AAPrepControllerCommand.prototype.execute = function(notification)
        {
            console.log("ages_all.controller.AAPrepControllerCommand executed");
    
            //TODO: register other commands for user interactions
            this.facade.registerCommand(AppConstants.DISPLAY_RECOMMENDATIONS, ages_all.controller.AADisplayRecommendationsCommand);
            this.facade.registerCommand(AppConstants.DISPLAY_THEME_SELECTION, ages_all.controller.AADisplayThemeSelectionCommand);
        }
        
    }
});


