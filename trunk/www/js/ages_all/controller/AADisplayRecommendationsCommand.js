jingo.declare(
{
    require: 
    [
        "ages_0to3.view.mediator.A03RecommendationsPageMediator",
        "ages_3to6.view.mediator.A36RecommendationsPageMediator",
        "ages_7to9.view.mediator.A79RecommendationsPageMediator"
    ],
    name: 'ages_all.controller.AADisplayRecommendationsCommand',
    as: function() 
    {

        ages_all.controller.AADisplayRecommendationsCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        ages_all.controller.AADisplayRecommendationsCommand.prototype = new puremvc.SimpleCommand;
        ages_all.controller.AADisplayRecommendationsCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_all.controller.AADisplayRecommendationsCommand.prototype.constructor = ages_all.controller.AADisplayRecommendationsCommand;

        ages_all.controller.AADisplayRecommendationsCommand.prototype.execute = function(notification)
        {
            console.log("ages_all.controller.AADisplayRecommendationsCommand executed");
            console.log("Notification body: " + notification.getBody());
    
            if (notification.getBody())
            {
                var user = notification.getBody().user;
                var refreshPageValue = notification.getBody().refreshPage;
                var refreshPage = (refreshPageValue != null) ? refreshPageValue : true;
                
                if (user.age <= 3)
                {
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
                else if (user.age <= 6)
                {
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
                else
                {
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
        
    }
});
