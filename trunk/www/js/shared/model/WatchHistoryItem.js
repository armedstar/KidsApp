jingo.declare(
{
    require: [],
    name: 'shared.model.WatchHistoryItem',
    as: function() 
    {

        shared.model.WatchHistoryItem = function(id, userId, programId, localDeviceTime)
        {
            this.id = id;
            this.userId = userId;
            this.programId = programId;
            this.localDeviceTime = localDeviceTime;
        }
        
        shared.model.WatchHistoryItem.prototype = {};
        shared.model.WatchHistoryItem.prototype.parent = Object.prototype;
        shared.model.WatchHistoryItem.prototype.constructor = shared.model.WatchHistoryItem;

        shared.model.WatchHistoryItem.prototype.toString = function()
        {
            return JSON.stringify(this);
        }
        
    }
});