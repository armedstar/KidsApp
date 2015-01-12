jingo.declare(
{
    require: 
    [
        "shared.view.component.AdvancedVideoPlayerPage",
        "shared.view.mediator.AdvancedVideoPlayerMediator",
        "shared.view.component.SimpleVideoPlayerPage",
        "shared.view.mediator.SimpleVideoPlayerMediator"
    ],
    name: 'ages_all.controller.AAPrepViewCommand',
    as: function() 
    {

        ages_all.controller.AAPrepViewCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        ages_all.controller.AAPrepViewCommand.prototype = new puremvc.SimpleCommand;
        ages_all.controller.AAPrepViewCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_all.controller.AAPrepViewCommand.prototype.constructor = ages_all.controller.AAPrepViewCommand;

        ages_all.controller.AAPrepViewCommand.prototype.execute = function(notification)
        {
            console.log("ages_all.controller.AAPrepViewCommand executed");
    
            if (this.facade.retrieveMediator(shared.view.mediator.AdvancedVideoPlayerMediator.NAME) == null)
            {
                var videoPlayer = new shared.view.component.AdvancedVideoPlayerPage(document.getElementById('advancedVideoPlayer'));
                var videoPlayerMediator = new shared.view.mediator.AdvancedVideoPlayerMediator(videoPlayer);
                this.facade.registerMediator(videoPlayerMediator);
            }
            
            if (this.facade.retrieveMediator(shared.view.mediator.SimpleVideoPlayerMediator.NAME) == null)
            {
                var videoPlayer = new shared.view.component.SimpleVideoPlayerPage(document.getElementById('simpleVideoPlayer'));
                var videoPlayerMediator = new shared.view.mediator.SimpleVideoPlayerMediator(videoPlayer);
                this.facade.registerMediator(videoPlayerMediator);
            }
    
        }
        
    }
});


