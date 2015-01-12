jingo.declare(
{
    require: 
    [
        "ages_3to6.view.mediator.A36ThemeSelectionPageMediator"
    ],
    name: 'ages_3to6.controller.A36DisplayThemeSelectionCommand',
    as: function() 
    {

        ages_3to6.controller.A36DisplayThemeSelectionCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        ages_3to6.controller.A36DisplayThemeSelectionCommand.prototype = new puremvc.SimpleCommand;
        ages_3to6.controller.A36DisplayThemeSelectionCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_3to6.controller.A36DisplayThemeSelectionCommand.prototype.constructor = ages_3to6.controller.A36DisplayThemeSelectionCommand;

        ages_3to6.controller.A36DisplayThemeSelectionCommand.prototype.execute = function(notification)
        {
            console.log("ages_3to6.controller.A36DisplayThemeSelectionCommand executed");
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
