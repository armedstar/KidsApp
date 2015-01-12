jingo.declare(
{
    require: 
    [
        "shared.controller.PrepControllerCommand",
        "ages_0to3.controller.A03PrepControllerCommand",
        "shared.controller.PrepModelCommand",
        "ages_0to3.controller.A03PrepModelCommand",
        "shared.controller.PrepViewCommand",
        "ages_0to3.controller.A03PrepViewCommand",
        "shared.controller.GotoInitialScreenCommand"
    ],
    name: 'ages_0to3.controller.A03StartupCommand',
    as: function() 
    {

        ages_0to3.controller.A03StartupCommand = function()
        {
            puremvc.MacroCommand.apply(this, arguments);
        }
        
        ages_0to3.controller.A03StartupCommand.prototype = new puremvc.MacroCommand;
        ages_0to3.controller.A03StartupCommand.prototype.parent = puremvc.MacroCommand.prototype;
        ages_0to3.controller.A03StartupCommand.prototype.constructor = ages_0to3.controller.A03StartupCommand;

        ages_0to3.controller.A03StartupCommand.prototype.initializeMacroCommand = function()
        {
            this.addSubCommand(shared.controller.PrepControllerCommand);
            this.addSubCommand(ages_0to3.controller.A03PrepControllerCommand);
            this.addSubCommand(shared.controller.PrepModelCommand);
            this.addSubCommand(ages_0to3.controller.A03PrepModelCommand);
            this.addSubCommand(shared.controller.PrepViewCommand);
            this.addSubCommand(ages_0to3.controller.A03PrepViewCommand);
            this.addSubCommand(shared.controller.GotoInitialScreenCommand);
        }
        
    }
});

