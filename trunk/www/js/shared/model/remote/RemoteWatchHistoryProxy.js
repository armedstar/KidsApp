jingo.declare(
{
    require: 
    [
        "shared.model.WatchHistoryItem"
    ],
    name: 'shared.model.remote.RemoteWatchHistoryProxy',
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
            var WatchHistory = Parse.Object.extend("WatchHistory");
            var query = new Parse.Query(WatchHistory);
            query.equalTo("userId", userId);
            if (numItems)
                query.limit(numItems);
            query.descending("createdAt");
    
            query.find({
                       success: function(results) {
                        var retArr = new Array();
                        for (var i = 0; i < results.length; i++) {
                       var id = results[i].id;
                       var userId = results[i].get("userId");
                       var progId = results[i].get("programId");
                       var localTime = results[i].get("localDeviceTime");
                       var item = new shared.model.WatchHistoryItem(id, userId, progId, localTime);
                       retArr.push(item);
                        }
                       successCallback(retArr);
                       },
                       error: function(error) {
                       if (failCallback)
                        failCallback(error);
                       }
            });
        }

        shared.model.WatchHistoryProxy.prototype.addProgramToHistory = function(userId, programId, successCallback, failCallback)
        {
            var WatchHistory = Parse.Object.extend("WatchHistory");
            var newWatchHistory = new WatchHistory();
            var curTime = getCurrentDateTimeStr();
            newWatchHistory.set("userId", userId);
            newWatchHistory.set("programId", programId);
            newWatchHistory.set("localDeviceTime", curTime);
            newWatchHistory.save(null, {
                                 success: function(item) {
                                    if (successCallback)
                                 successCallback(new shared.model.WatchHistoryItem(item.id, userId, programId, curTime));
                                 },
                                 error: function(item,err) {
                                 if (failCallback) {
                                 failCallback(err);
                                 }
                                 }
                                 });
        }

        shared.model.WatchHistoryProxy.prototype.clearHistory = function(userId)
        {
            var WatchHistory = Parse.Object.extend("WatchHistory");
            var WatchHistCollection = Parse.Collection.extend({
                                                     model: WatchHistory,
                                                     query: (new Parse.Query(WatchHistory)).equalTo("userId", userId)
                                                     });
            var collection = new WatchHistCollection();
            collection.reset([]);
        }
        
    }
});