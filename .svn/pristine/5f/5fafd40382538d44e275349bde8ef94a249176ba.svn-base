jingo.declare(
{
    require: 
    [
        "ages_7to9.view.mediator.A79RecommendationsPageMediator"
    ],
    name: 'ages_7to9.controller.A79DisplayRecommendationsCommand',
    as: function() 
    {

        ages_7to9.controller.A79DisplayRecommendationsCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        ages_7to9.controller.A79DisplayRecommendationsCommand.prototype = new puremvc.SimpleCommand;
        ages_7to9.controller.A79DisplayRecommendationsCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_7to9.controller.A79DisplayRecommendationsCommand.prototype.constructor = ages_7to9.controller.A79DisplayRecommendationsCommand;

        ages_7to9.controller.A79DisplayRecommendationsCommand.prototype.execute = function(notification)
        {
            console.log("ages_7to9.controller.A79DisplayRecommendationsCommand executed");
            console.log("Notification body: " + notification.getBody());
    
            if (notification.getBody())
            {
                var user = notification.getBody().user;
                var refreshPageValue = notification.getBody().refreshPage;
                var refreshPage = (refreshPageValue != null) ? refreshPageValue : true;
        
                var recsMediator = this.facade.retrieveMediator(ages_7to9.view.mediator.A79RecommendationsPageMediator.NAME);
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
