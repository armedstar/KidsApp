jingo.declare(
{
    require: 
    [
        "shared.model.WatchHistoryItem"
    ],
    name: 'shared.model.local.LocalWatchHistoryProxy',
    as: function() 
    {

        shared.model.WatchHistoryProxy = function()
        {
            puremvc.Proxy.apply(this, [shared.model.WatchHistoryProxy.NAME, new Array()]);
        }

        shared.model.WatchHistoryProxy.prototype = new puremvc.Proxy;
        shared.model.WatchHistoryProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.WatchHistoryProxy.prototype.constructor = shared.model.WatchHistoryProxy;
        
        shared.model.WatchHistoryProxy.NAME = "WatchHistoryProxy";

        shared.model.WatchHistoryProxy.prototype.getMostRecentlyWatchedItems = function(userId, numItems, successCallback, failCallback)
        {
            return new Array();
        }

        shared.model.WatchHistoryProxy.prototype.addProgramToHistory = function(userId, programId, successCallback, failCallback)
        {
            // Noop
        }

        shared.model.WatchHistoryProxy.prototype.clearHistory = function(userId)
        {
            // Noop
        }
        
    }
});