jingo.declare(
{
    require: 
    [
        "ages_0to3.view.mediator.A03RecommendationsPageMediator"
    ],
    name: 'ages_0to3.controller.A03DisplayRecommendationsCommand',
    as: function() 
    {

        ages_0to3.controller.A03DisplayRecommendationsCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        ages_0to3.controller.A03DisplayRecommendationsCommand.prototype = new puremvc.SimpleCommand;
        ages_0to3.controller.A03DisplayRecommendationsCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_0to3.controller.A03DisplayRecommendationsCommand.prototype.constructor = ages_0to3.controller.A03DisplayRecommendationsCommand;

        ages_0to3.controller.A03DisplayRecommendationsCommand.prototype.execute = function(notification)
        {
            console.log("ages_0to3.controller.A03DisplayRecommendationsCommand executed");
            console.log("Notification body: " + notification.getBody());
    
            if (notification.getBody())
            {
                var user = notification.getBody().user;
                var refreshPageValue = notification.getBody().refreshPage;
                var refreshPage = (refreshPageValue != null) ? refreshPageValue : true;
        
                var recsMediator = this.facade.retrieveMediator(ages_0to3.view.mediator.A03RecommendationsPageMediator.NAME);
                this.sendNotification(
                    AppConstants.SHOW_PAGE, 
                    {
                        pageMediator: recsMediator, 
                        userData: user, 
                        pageData: null,
                        refreshPage: refreshPage
                    });
            }
        }
        
    }
});
