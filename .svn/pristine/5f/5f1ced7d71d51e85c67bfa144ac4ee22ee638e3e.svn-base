jingo.declare(
{
    require: 
    [
        "ages_0to3.model.A03ThemeProxy"
    ],
    name: 'ages_0to3.controller.A03PrepModelCommand',
    as: function() 
    {

        ages_0to3.controller.A03PrepModelCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        ages_0to3.controller.A03PrepModelCommand.prototype = new puremvc.SimpleCommand;
        ages_0to3.controller.A03PrepModelCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_0to3.controller.A03PrepModelCommand.prototype.constructor = ages_0to3.controller.A03PrepModelCommand;
        
        ages_0to3.controller.A03PrepModelCommand.prototype.execute = function(notification)
        {
            console.log("A03PrepModelCommand executed");
    
            this.facade.registerProxy(new ages_0to3.model.A03ThemeProxy());
        }
        
    }
});

