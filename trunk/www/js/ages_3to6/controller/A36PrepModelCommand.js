jingo.declare(
{
    require: 
    [
        "ages_3to6.model.A36ThemeProxy"
    ],
    name: 'ages_3to6.controller.A36PrepModelCommand',
    as: function() 
    {

        ages_3to6.controller.A36PrepModelCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        ages_3to6.controller.A36PrepModelCommand.prototype = new puremvc.SimpleCommand;
        ages_3to6.controller.A36PrepModelCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_3to6.controller.A36PrepModelCommand.prototype.constructor = ages_3to6.controller.A36PrepModelCommand;
        
        ages_3to6.controller.A36PrepModelCommand.prototype.execute = function(notification)
        {
            console.log("A36PrepModelCommand executed");
    
            this.facade.registerProxy(new ages_3to6.model.A36ThemeProxy());
        }
        
    }
});

