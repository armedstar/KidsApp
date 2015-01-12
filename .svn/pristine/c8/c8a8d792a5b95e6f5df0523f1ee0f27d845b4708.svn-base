jingo.declare(
{
    require: 
    [
        "ages_3to6.view.mediator.A36RecommendationsPageMediator"
    ],
    name: 'ages_3to6.controller.A36DisplayRecommendationsCommand',
    as: function() 
    {

        ages_3to6.controller.A36DisplayRecommendationsCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        ages_3to6.controller.A36DisplayRecommendationsCommand.prototype = new puremvc.SimpleCommand;
        ages_3to6.controller.A36DisplayRecommendationsCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_3to6.controller.A36DisplayRecommendationsCommand.prototype.constructor = ages_3to6.controller.A36DisplayRecommendationsCommand;

        ages_3to6.controller.A36DisplayRecommendationsCommand.prototype.execute = function(notification)
        {
            console.log("ages_3to6.controller.A36DisplayRecommendationsCommand executed");
            console.log("Notification body: " + notification.getBody());
    
            if (notification.getBody())
            {
                var user = notification.getBody().user;
                var refreshPageValue = notification.getBody().refreshPage;
                var refreshPage = (refreshPageValue != null) ? refreshPageValue : true;
        
                var recsMediator = this.facade.retrieveMediator(ages_3to6.view.mediator.A36RecommendationsPageMediator.NAME);
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
