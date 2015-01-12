jingo.declare(
{
    require: 
    [
        "shared.controller.PrepControllerCommand",
        "ages_3to6.controller.A36PrepControllerCommand",
        "shared.controller.PrepModelCommand",
        "ages_3to6.controller.A36PrepModelCommand",
        "shared.controller.PrepViewCommand",
        "ages_3to6.controller.A36PrepViewCommand",
        "shared.controller.GotoInitialScreenCommand"
    ],
    name: 'ages_3to6.controller.A36StartupCommand',
    as: function() 
    {
    
        ages_3to6.controller.A36StartupCommand = function()
        {
            puremvc.MacroCommand.apply(this, arguments);
        }
        
        ages_3to6.controller.A36StartupCommand.prototype = new puremvc.MacroCommand;
        ages_3to6.controller.A36StartupCommand.prototype.parent = puremvc.MacroCommand.prototype;
        ages_3to6.controller.A36StartupCommand.prototype.constructor = ages_3to6.controller.A36StartupCommand;

        ages_3to6.controller.A36StartupCommand.prototype.initializeMacroCommand = function()
        {
            this.addSubCommand(shared.controller.PrepControllerCommand);
            this.addSubCommand(ages_3to6.controller.A36PrepControllerCommand);
            this.addSubCommand(shared.controller.PrepModelCommand);
            this.addSubCommand(ages_3to6.controller.A36PrepModelCommand);
            this.addSubCommand(shared.controller.PrepViewCommand);
            this.addSubCommand(ages_3to6.controller.A36PrepViewCommand);
            this.addSubCommand(shared.controller.GotoInitialScreenCommand);
        }
        
    }
});

