jingo.declare(
{
    require: 
    [
        "shared.view.mediator.CanvasMediator",
        "shared.view.mediator.AdvancedVideoPlayerMediator",
        "shared.view.mediator.SimpleVideoPlayerMediator"
    ],
    name: 'shared.view.mediator.ShellMediator',
    as: function() 
    {
    
        shared.view.mediator.ShellMediator = function(viewComponent)
        {
            puremvc.Mediator.apply(this, [shared.view.mediator.ShellMediator.NAME, viewComponent]);
        }

        shared.view.mediator.ShellMediator.prototype = new puremvc.Mediator;
        shared.view.mediator.ShellMediator.prototype.parent = puremvc.Mediator.prototype;
        shared.view.mediator.ShellMediator.prototype.constructor = shared.view.mediator.ShellMediator;

        shared.view.mediator.ShellMediator.NAME = "ShellMediator";

        shared.view.mediator.ShellMediator.prototype.getView = function()
        {
            return this.viewComponent;
        }

        shared.view.mediator.ShellMediator.prototype.listNotificationInterests = function()
        {
            return [AppConstants.SHOW_ADVANCED_VIDEO_PLAYER, AppConstants.SHOW_SIMPLE_VIDEO_PLAYER, AppConstants.SHOW_PAGE];
        }

        shared.view.mediator.ShellMediator.prototype.handleNotification = function(notification)
        {
            var canvasMediator = this.facade.retrieveMediator(shared.view.mediator.CanvasMediator.NAME);
            var advancedVideoPlayerMediator = this.facade.retrieveMediator(shared.view.mediator.AdvancedVideoPlayerMediator.NAME);
            var simpleVideoPlayerMediator = this.facade.retrieveMediator(shared.view.mediator.SimpleVideoPlayerMediator.NAME);
    
            switch(notification.getName())
            {

                case AppConstants.SHOW_ADVANCED_VIDEO_PLAYER:
                    if (advancedVideoPlayerMediator)
                    {
                        var programId = notification.getBody().id;
                        canvasMediator.hide();
                        if (simpleVideoPlayerMediator)
                        {
                            simpleVideoPlayerMediator.hide();
                        }
            
                        if (programId)
                        {
                            console.log("Playing video for program id: " + programId);
                            advancedVideoPlayerMediator.loadVideo(programId);
                        }
                        advancedVideoPlayerMediator.show(this.facade.getCurrentUser());
                    }
            
                    break;
                    
                case AppConstants.SHOW_SIMPLE_VIDEO_PLAYER:
                    if (simpleVideoPlayerMediator)
                    {
                        var programId = notification.getBody().id;
                        canvasMediator.hide();
                        if (advancedVideoPlayerMediator)
                        {
                            advancedVideoPlayerMediator.hide();
                        }
            
                        if (programId)
                        {
                            console.log("Playing video for program id: " + programId);
                            simpleVideoPlayerMediator.loadVideo(programId);
                        }
                        simpleVideoPlayerMediator.show(this.facade.getCurrentUser());
                    }
            
                    break;
                    
                case AppConstants.SHOW_PAGE:
                    if (advancedVideoPlayerMediator)
                    {
                        advancedVideoPlayerMediator.pause();
                        advancedVideoPlayerMediator.hide();
                    }
                    
                    if (simpleVideoPlayerMediator)
                    {
                        simpleVideoPlayerMediator.pause();
                        simpleVideoPlayerMediator.hide();
                    }
                    
                    canvasMediator.show();
                    break;
            }
        }
        
    }
});

