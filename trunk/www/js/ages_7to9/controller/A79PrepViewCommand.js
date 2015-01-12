jingo.declare(
{
    require: 
    [
        "shared.view.component.Canvas",
        "shared.view.mediator.CanvasMediator",
        "shared.view.component.AdvancedVideoPlayerPage",
        "shared.view.mediator.AdvancedVideoPlayerMediator",
        "shared.view.component.Nameplate",
        "ages_7to9.view.component.A79RecommendationsPage",
        "ages_7to9.view.mediator.A79RecommendationsPageMediator"
    ],
    name: 'ages_7to9.controller.A79PrepViewCommand',
    as: function() 
    {

        ages_7to9.controller.A79PrepViewCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        ages_7to9.controller.A79PrepViewCommand.prototype = new puremvc.SimpleCommand;
        ages_7to9.controller.A79PrepViewCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_7to9.controller.A79PrepViewCommand.prototype.constructor = ages_7to9.controller.A79PrepViewCommand;

        ages_7to9.controller.A79PrepViewCommand.prototype.execute = function(notification)
        {
            console.log("ages_7to9.controller.A79PrepViewCommand executed");
            
            if (this.facade.retrieveMediator(shared.view.mediator.AdvancedVideoPlayerMediator.NAME) == null)
            {
                var videoPlayer = new shared.view.component.AdvancedVideoPlayerPage(document.getElementById('advancedVideoPlayer'));
                var videoPlayerMediator = new shared.view.mediator.AdvancedVideoPlayerMediator(videoPlayer);
                this.facade.registerMediator(videoPlayerMediator);
            }
            
            var canvasMediator = this.facade.retrieveMediator(shared.view.mediator.CanvasMediator.NAME);
            var canvas = canvasMediator.getView();
              
            var nameplate = new shared.view.component.Nameplate(document.getElementById('namePlate'), true);
    
            var recommendationsPage = new ages_7to9.view.component.A79RecommendationsPage(canvas, nameplate);
            var recommendationsPageMediator = new ages_7to9.view.mediator.A79RecommendationsPageMediator(recommendationsPage);
            this.facade.registerMediator(recommendationsPageMediator);
    
        }
        
    }
});


