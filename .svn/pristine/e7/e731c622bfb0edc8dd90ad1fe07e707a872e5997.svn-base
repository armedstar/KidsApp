includeJS("js/shared/view/component/UIComponent.js");
includeJS("js/shared/view/component/BasePage.js");
includeJS("js/shared/view/mediator/BasePageMediator.js");
includeJS("js/shared/view/mediator/ShellMediator.js");
includeJS("js/shared/view/component/Canvas.js");
includeJS("js/shared/view/mediator/CanvasMediator.js");
includeJS("js/ces/view/component/CESLoginPage.js");
includeJS("js/ces/view/mediator/CESLoginPageMediator.js");
includeJS("js/ces/view/component/CESRecommendationsPage.js");
includeJS("js/ces/view/mediator/CESRecommendationsPageMediator.js");
includeJS("js/ces/view/component/CESVideoPlayerPage.js");
includeJS("js/ces/view/mediator/CESVideoPlayerMediator.js");
includeJS("js/shared/view/component/Sounds.js");


CESPrepViewCommand.prototype = new puremvc.SimpleCommand;

function CESPrepViewCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

CESPrepViewCommand.prototype.execute = function(notification)
{
    console.log("CESPrepViewCommand executed");
    
    var videoPlayer = new CESVideoPlayerPage(document.getElementById('videoPlayer'));
    var videoPlayerMediator = new CESVideoPlayerMediator(videoPlayer);
    this.facade.registerMediator(videoPlayerMediator);
    
    var shellMediator = new ShellMediator(document.getElementById('shell'));
    this.facade.registerMediator(shellMediator);
    
    var canvas = new Canvas(document.getElementById('mainCanvas'));
    var canvasMediator = new CanvasMediator(canvas);
    this.facade.registerMediator(canvasMediator);
    
    var login = new CESLoginPage(canvas);
    var loginPageMediator = new CESLoginPageMediator(login);
    this.facade.registerMediator(loginPageMediator);
    
    var recommendationsPage = new CESRecommendationsPage(canvas);
    var recommendationsPageMediator = new CESRecommendationsPageMediator(recommendationsPage);
    this.facade.registerMediator(recommendationsPageMediator);
    
}


