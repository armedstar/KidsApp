jingo.declare(
{
    require: 
    [
        "shared.model.ThemeProxy"
    ],
    name: 'ages_all.controller.AAPrepModelCommand',
    as: function() 
    {

        ages_all.controller.AAPrepModelCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        ages_all.controller.AAPrepModelCommand.prototype = new puremvc.SimpleCommand;
        ages_all.controller.AAPrepModelCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        ages_all.controller.AAPrepModelCommand.prototype.constructor = ages_all.controller.AAPrepModelCommand;
        
        ages_all.controller.AAPrepModelCommand.prototype.execute = function(notification)
        {
            console.log("AAPrepModelCommand executed");
    
            this.facade.registerProxy(new shared.model.ThemeProxy());
        }
        
    }
});

