CESDisplayRecommendationsCommand.prototype = new puremvc.SimpleCommand;

function CESDisplayRecommendationsCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

CESDisplayRecommendationsCommand.prototype.execute = function(notification)
{
    console.log("CESDisplayRecommendationsCommand executed");
    console.log("Notification body: " + notification.getBody());
    
    if (notification.getBody())
    {
        var user = notification.getBody().user;
        var refreshPageValue = notification.getBody().refreshPage;
        var refreshPage = (refreshPageValue != null) ? refreshPageValue : true;
        
        var recsMediator = this.facade.retrieveMediator(CESRecommendationsPageMediator.NAME);
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
