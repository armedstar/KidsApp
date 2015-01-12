jingo.declare(
{
    require: 
    [
        "shared.model.ApplicationLoggingProxy",
        "shared.model.WatchHistoryProxy"
    ],
    name: 'shared.controller.SendProgramHistoryEventCommand',
    as: function() 
    {

        shared.controller.SendProgramHistoryEventCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.SendProgramHistoryEventCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.SendProgramHistoryEventCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.SendProgramHistoryEventCommand.prototype.constructor = shared.controller.SendProgramHistoryEventCommand;

        shared.controller.SendProgramHistoryEventCommand.ADD_TO_HISTORY = "add";
        shared.controller.SendProgramHistoryEventCommand.GET_RECENT = "get";

        shared.controller.SendProgramHistoryEventCommand.prototype.execute = function(notification)
        {
            if (notification.getBody())
            {
                var operation = notification.getBody().operation;
                var progId = notification.getBody().programId;
                var userId = notification.getBody().userId;
                var limit = notification.getBody().limit;
                var proxy = this.facade.retrieveProxy(shared.model.WatchHistoryProxy.NAME);
        
                if (limit == null)
                    limit = 10;
        
                switch (operation)
                {
                    case shared.controller.SendProgramHistoryEventCommand.ADD_TO_HISTORY:
                        proxy.addProgramToHistory(userId, progId);
                        break;
                    case shared.controller.SendProgramHistoryEventCommand.GET_RECENT:
                        proxy.getMostRecentlyWatchedItems(userId, limit, Relegate.create(this, this.onGetRecentWatchSuccess, this), Relegate.create(this, this.onGetRecentWatchError, this));
                        break;
                }
            }
        }

        shared.controller.SendProgramHistoryEventCommand.prototype.onGetRecentWatchSuccess = function(watchHistoryItems)
        {
            //watchHistoryItems an array of WatchHistoryItem
    
            //TODO: if we have a view that shows history in the app, then trigger the command to show it.
            for (var i = 0; i < watchHistoryItems.length; i++)
            {
                console.log("History Item: " + watchHistoryItems[i]);
            }
        }

        shared.controller.SendProgramHistoryEventCommand.prototype.onGetRecentWatchError = function(error)
        {
    
        }
        
    }
});