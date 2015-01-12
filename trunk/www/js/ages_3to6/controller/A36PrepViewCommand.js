jingo.declare(
{
    require: 
    [
        "shared.view.component.Canvas",
        "shared.view.mediator.CanvasMediator",
        "shared.view.component.AdvancedVideoPlayerPage",
        "shared.view.mediator.AdvancedVideoPlayerMediator",
        "shared.view.component.Nameplate",
        "shared.view.component.ThemePicker",
        "ages_3to6.view.component.A36RecommendationsPage",
        "ages_3to6.view.mediator.A36RecommendationsPageMediator",
        "ages_3to6.view.component.A36ThemeSelectionPage",
        "ages_3to6.view.mediator.A36ThemeSelectionPageMediator"
    ],
    name: 'ages_3to6.controller.A36PrepViewCommand',
    as: function() 
    {

        ages_3to6.controller.A36PrepViewCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        ages_3to6.controller.A36PrepViewCommand.prototype = new puremvc.SimpleCommand;
        ages_3to6.controller.A36PrepViewCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_3to6.controller.A36PrepViewCommand.prototype.constructor = ages_3to6.controller.A36PrepViewCommand;

        ages_3to6.controller.A36PrepViewCommand.prototype.execute = function(notification)
        {
            console.log("ages_3to6.controller.A36PrepViewCommand executed");
    
            if (this.facade.retrieveMediator(shared.view.mediator.AdvancedVideoPlayerMediator.NAME) == null)
            {
                var videoPlayer = new shared.view.component.AdvancedVideoPlayerPage(document.getElementById('advancedVideoPlayer'));
                var videoPlayerMediator = new shared.view.mediator.AdvancedVideoPlayerMediator(videoPlayer);
                this.facade.registerMediator(videoPlayerMediator);
            }
            
            var canvasMediator = this.facade.retrieveMediator(shared.view.mediator.CanvasMediator.NAME);
            var canvas = canvasMediator.getView();
              
            var nameplate = new shared.view.component.Nameplate(document.getElementById('namePlate'), true);
            var themePicker = new shared.view.component.ThemePicker(document.getElementById('themePicker'));
    
            var recommendationsPage = new ages_3to6.view.component.A36RecommendationsPage(canvas, nameplate, themePicker);
            var recommendationsPageMediator = new ages_3to6.view.mediator.A36RecommendationsPageMediator(recommendationsPage);
            this.facade.registerMediator(recommendationsPageMediator);
    
            var themeSelectionPage = new ages_3to6.view.component.A36ThemeSelectionPage(canvas, nameplate);
            var themeSelectionPageMediator = new ages_3to6.view.mediator.A36ThemeSelectionPageMediator(themeSelectionPage);
            this.facade.registerMediator(themeSelectionPageMediator);
    
        }
        
    }
});


