jingo.declare(
{
    require: 
    [
        "shared.view.mediator.ShellMediator",
        "shared.view.component.Canvas",
        "shared.view.mediator.CanvasMediator",
        "shared.view.component.LoginPage",
        "shared.view.mediator.LoginPageMediator",
        "shared.view.component.Nameplate"
    ],
    name: 'shared.controller.PrepViewCommand',
    as: function() 
    {

        shared.controller.PrepViewCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.PrepViewCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.PrepViewCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.PrepViewCommand.prototype.constructor = shared.controller.PrepViewCommand;

        shared.controller.PrepViewCommand.prototype.execute = function(notification)
        {
            console.log("shared.controller.PrepViewCommand executed");
    
            var shellMediator = new shared.view.mediator.ShellMediator(document.getElementById('shell'));
            this.facade.registerMediator(shellMediator);
    
            var canvas = new shared.view.component.Canvas(document.getElementById('mainCanvas'));
            var canvasMediator = new shared.view.mediator.CanvasMediator(canvas);
            this.facade.registerMediator(canvasMediator);
              
            var nameplate = new shared.view.component.Nameplate(document.getElementById('namePlate'), false);
    
            var login = new shared.view.component.LoginPage(canvas, nameplate);
            var loginPageMediator = new shared.view.mediator.LoginPageMediator(login);
            this.facade.registerMediator(loginPageMediator);
        }
        
    }
});


