jingo.declare(
{
    require: 
    [
        "ages_3to6.view.mediator.A36ThemeSelectionPageMediator"
    ],
    name: 'ages_all.controller.AADisplayThemeSelectionCommand',
    as: function() 
    {

        ages_all.controller.AADisplayThemeSelectionCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        ages_all.controller.AADisplayThemeSelectionCommand.prototype = new puremvc.SimpleCommand;
        ages_all.controller.AADisplayThemeSelectionCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_all.controller.AADisplayThemeSelectionCommand.prototype.constructor = ages_all.controller.AADisplayThemeSelectionCommand;

        ages_all.controller.AADisplayThemeSelectionCommand.prototype.execute = function(notification)
        {
            console.log("ages_all.controller.AADisplayThemeSelectionCommand executed");
            console.log("Notification body: " + notification.getBody());
    
            if (notification.getBody())
            {
                var user = notification.getBody().user;
                var refreshPageValue = notification.getBody().refreshPage;
                var refreshPage = (refreshPageValue != null) ? refreshPageValue : true;
        
                var pageMediator = this.facade.retrieveMediator(ages_3to6.view.mediator.A36ThemeSelectionPageMediator.NAME);
                this.sendNotification(
                    AppConstants.SHOW_PAGE, 
                    {
                        pageMediator: pageMediator, 
                        userData: user, 
                        pageData: null,
                        refreshPage: refreshPage
                    });
            }
        }
        
    }
});
