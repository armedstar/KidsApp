jingo.declare(
{
    require: 
    [
        "shared.view.component.Canvas",
        "shared.view.component.Nameplate",
        "shared.view.mediator.CanvasMediator",
        "shared.view.component.AdvancedVideoPlayerPage",
        "shared.view.mediator.AdvancedVideoPlayerMediator",
        "shared.view.component.Nameplate",
        "ages_0to3.view.component.A03RecommendationsPage",
        "ages_0to3.view.mediator.A03RecommendationsPageMediator"
    ],
    name: 'ages_0to3.controller.A03PrepViewCommand',
    as: function() 
    {

        ages_0to3.controller.A03PrepViewCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        ages_0to3.controller.A03PrepViewCommand.prototype = new puremvc.SimpleCommand;
        ages_0to3.controller.A03PrepViewCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_0to3.controller.A03PrepViewCommand.prototype.constructor = ages_0to3.controller.A03PrepViewCommand;

        ages_0to3.controller.A03PrepViewCommand.prototype.execute = function(notification)
        {
            console.log("ages_0to3.controller.A03PrepViewCommand executed");
    
            if (this.facade.retrieveMediator(shared.view.mediator.SimpleVideoPlayerMediator.NAME) == null)
            {
                var videoPlayer = new shared.view.component.SimpleVideoPlayerPage(document.getElementById('simpleVideoPlayer'));
                var videoPlayerMediator = new shared.view.mediator.SimpleVideoPlayerMediator(videoPlayer);
                this.facade.registerMediator(videoPlayerMediator);
            }
            
            var canvasMediator = this.facade.retrieveMediator(shared.view.mediator.CanvasMediator.NAME);
            var canvas = canvasMediator.getView();
              
            var nameplate = new shared.view.component.Nameplate(document.getElementById('namePlate'), true);
    
            var recommendationsPage = new ages_0to3.view.component.A03RecommendationsPage(canvas, nameplate);
            var recommendationsPageMediator = new ages_0to3.view.mediator.A03RecommendationsPageMediator(recommendationsPage);
            this.facade.registerMediator(recommendationsPageMediator);
    
        }
        
    }
});


