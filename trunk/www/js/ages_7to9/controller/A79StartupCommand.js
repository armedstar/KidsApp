jingo.declare(
{
    require: 
    [
        "shared.controller.PrepControllerCommand",
        "ages_7to9.controller.A79PrepControllerCommand",
        "shared.controller.PrepModelCommand",
        "ages_7to9.controller.A79PrepModelCommand",
        "shared.controller.PrepViewCommand",
        "ages_7to9.controller.A79PrepViewCommand",
        "shared.controller.GotoInitialScreenCommand"
    ],
    name: 'ages_7to9.controller.A79StartupCommand',
    as: function() 
    {
    
        ages_7to9.controller.A79StartupCommand = function()
        {
            puremvc.MacroCommand.apply(this, arguments);
        }
        
        ages_7to9.controller.A79StartupCommand.prototype = new puremvc.MacroCommand;
        ages_7to9.controller.A79StartupCommand.prototype.parent = puremvc.MacroCommand.prototype;
        ages_7to9.controller.A79StartupCommand.prototype.constructor = ages_7to9.controller.A79StartupCommand;

        ages_7to9.controller.A79StartupCommand.prototype.initializeMacroCommand = function()
        {
            this.addSubCommand(shared.controller.PrepControllerCommand);
            this.addSubCommand(ages_7to9.controller.A79PrepControllerCommand);
            this.addSubCommand(shared.controller.PrepModelCommand);
            this.addSubCommand(ages_7to9.controller.A79PrepModelCommand);
            this.addSubCommand(shared.controller.PrepViewCommand);
            this.addSubCommand(ages_7to9.controller.A79PrepViewCommand);
            this.addSubCommand(shared.controller.GotoInitialScreenCommand);
        }
        
    }
});

