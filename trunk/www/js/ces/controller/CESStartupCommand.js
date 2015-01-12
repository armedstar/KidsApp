includeJS("js/ces/controller/CESPrepControllerCommand.js");
includeJS("js/ces/controller/CESPrepModelCommand.js");
includeJS("js/ces/controller/CESPrepViewCommand.js");
includeJS("js/shared/controller/GotoInitialScreenCommand.js");

CESStartupCommand.prototype = new puremvc.MacroCommand;

function CESStartupCommand()
{
    puremvc.MacroCommand.apply(this, arguments);
}

CESStartupCommand.prototype.initializeMacroCommand = function()
{
    this.addSubCommand(CESPrepControllerCommand);
    this.addSubCommand(CESPrepModelCommand);
    this.addSubCommand(CESPrepViewCommand);
    this.addSubCommand(GotoInitialScreenCommand);
}

