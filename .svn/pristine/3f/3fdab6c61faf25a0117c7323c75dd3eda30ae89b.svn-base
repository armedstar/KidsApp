jingo.declare(
{
    require: 
    [
        "shared.model.RCSProxy",
        "shared.view.mediator.ProgramDetailsPageMediator"
    ],
    name: 'shared.controller.DisplayProgramDetailsCommand',
    as: function() 
    {

        shared.controller.DisplayProgramDetailsCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        shared.controller.DisplayProgramDetailsCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.DisplayProgramDetailsCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.DisplayProgramDetailsCommand.prototype.constructor = shared.controller.DisplayProgramDetailsCommand;

        shared.controller.DisplayProgramDetailsCommand.prototype.execute = function(notification)
        {
            console.log("shared.controller.DisplayProgramDetailsCommand executed");
            console.log("Notification body: " + notification.getBody());
    
            if (notification.getBody())
            {
                console.log("Program type: " + notification.getBody().programType);
                console.log("Program id: " + notification.getBody().programId);
                var programType = notification.getBody().programType;
                var programId = notification.getBody().programId;
                var rcsProxy = this.facade.retrieveProxy(shared.model.RCSProxy.NAME);
        
                if (programType == "movie")
                {
                    rcsProxy.getMovieInfo(programId, Relegate.create(this, this.getSuccessCallback, this), function() {});
                }
                else if (programType == "tvSeries")
                {
                    rcsProxy.getTVSeriesInfo(programId, Relegate.create(this, this.getSuccessCallback, this), function() {});
                }
        
            }
        }

        shared.controller.DisplayProgramDetailsCommand.prototype.getSuccessCallback = function(data)
        {
            var pageMediator = this.facade.retrieveMediator(shared.view.mediator.ProgramDetailsPageMediator.NAME);
            this.sendNotification(AppConstants.SHOW_PAGE, {pageMediator: pageMediator, userData: null, pageData: data});
        }
        
    }
});