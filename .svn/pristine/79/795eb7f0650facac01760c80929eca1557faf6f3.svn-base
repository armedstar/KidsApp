jingo.declare(
{
    require: 
    [
        "ages_0to3.controller.A03DisplayRecommendationsCommand"
    ],
    name: 'ages_0to3.controller.A03PrepControllerCommand',
    as: function() 
    {

        ages_0to3.controller.A03PrepControllerCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
        
        ages_0to3.controller.A03PrepControllerCommand.prototype = new puremvc.SimpleCommand;
        ages_0to3.controller.A03PrepControllerCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_0to3.controller.A03PrepControllerCommand.prototype.constructor = ages_0to3.controller.A03PrepControllerCommand;

        ages_0to3.controller.A03PrepControllerCommand.prototype.execute = function(notification)
        {
            console.log("ages_0to3.controller.A03PrepControllerCommand executed");
    
            //TODO: register other commands for user interactions
            this.facade.registerCommand(AppConstants.DISPLAY_RECOMMENDATIONS, ages_0to3.controller.A03DisplayRecommendationsCommand);
        }
        
    }
});


