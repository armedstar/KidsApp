jingo.declare(
{
    require: 
    [
        "shared.controller.PrepControllerCommand",
        "ages_all.controller.AAPrepControllerCommand",
        "shared.controller.PrepModelCommand",
        "ages_all.controller.AAPrepModelCommand",
        "shared.controller.PrepViewCommand",
        "ages_all.controller.AAPrepViewCommand",
        "ages_0to3.controller.A03PrepViewCommand",
        "ages_3to6.controller.A36PrepViewCommand",
        "ages_7to9.controller.A79PrepViewCommand",
        "shared.controller.GotoInitialScreenCommand"
    ],
    name: 'ages_all.controller.AAStartupCommand',
    as: function() 
    {
    
        ages_all.controller.AAStartupCommand = function()
        {
            puremvc.MacroCommand.apply(this, arguments);
        }
        
        ages_all.controller.AAStartupCommand.prototype = new puremvc.MacroCommand;
        ages_all.controller.AAStartupCommand.prototype.parent = puremvc.MacroCommand.prototype;
        ages_all.controller.AAStartupCommand.prototype.constructor = ages_all.controller.AAStartupCommand;

        ages_all.controller.AAStartupCommand.prototype.initializeMacroCommand = function()
        {
            this.addSubCommand(shared.controller.PrepControllerCommand);
            this.addSubCommand(ages_all.controller.AAPrepControllerCommand);
            this.addSubCommand(shared.controller.PrepModelCommand);
            this.addSubCommand(ages_all.controller.AAPrepModelCommand);
            this.addSubCommand(shared.controller.PrepViewCommand);
            this.addSubCommand(ages_all.controller.AAPrepViewCommand);
            this.addSubCommand(ages_0to3.controller.A03PrepViewCommand);
            this.addSubCommand(ages_3to6.controller.A36PrepViewCommand);
            this.addSubCommand(ages_7to9.controller.A79PrepViewCommand);
            this.addSubCommand(shared.controller.GotoInitialScreenCommand);
        }
        
    }
});


