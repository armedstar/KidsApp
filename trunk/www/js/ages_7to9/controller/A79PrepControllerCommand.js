jingo.declare(
{
    require: 
    [
        "ages_7to9.controller.A79DisplayRecommendationsCommand"
    ],
    name: 'ages_7to9.controller.A79PrepControllerCommand',
    as: function() 
    {

        ages_7to9.controller.A79PrepControllerCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
        
        ages_7to9.controller.A79PrepControllerCommand.prototype = new puremvc.SimpleCommand;
        ages_7to9.controller.A79PrepControllerCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_7to9.controller.A79PrepControllerCommand.prototype.constructor = ages_7to9.controller.A79PrepControllerCommand;

        ages_7to9.controller.A79PrepControllerCommand.prototype.execute = function(notification)
        {
            console.log("ages_7to9.controller.A79PrepControllerCommand executed");
    
            //TODO: register other commands for user interactions
            this.facade.registerCommand(AppConstants.DISPLAY_RECOMMENDATIONS, ages_7to9.controller.A79DisplayRecommendationsCommand);
        }
        
    }
});


