jingo.declare(
{
    require: 
    [
        "ages_7to9.model.A79ThemeProxy"
    ],
    name: 'ages_7to9.controller.A79PrepModelCommand',
    as: function() 
    {

        ages_7to9.controller.A79PrepModelCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        ages_7to9.controller.A79PrepModelCommand.prototype = new puremvc.SimpleCommand;
        ages_7to9.controller.A79PrepModelCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_7to9.controller.A79PrepModelCommand.prototype.constructor = ages_7to9.controller.A79PrepModelCommand;
        
        ages_7to9.controller.A79PrepModelCommand.prototype.execute = function(notification)
        {
            console.log("A79PrepModelCommand executed");
    
            this.facade.registerProxy(new ages_7to9.model.A79ThemeProxy());
        }
        
    }
});

