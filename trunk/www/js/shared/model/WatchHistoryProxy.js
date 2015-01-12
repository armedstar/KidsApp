if (!DEBUG_USE_OFFLINE_PROXY_MODE)
{
    jingo.declare(
    {
        require: 
        [
            'shared.model.remote.RemoteWatchHistoryProxy'
        ],
        name: 'shared.model.WatchHistoryProxy',
        as: function() 
        {
        
            // Noop
            
        }
    });
}
else
{
    jingo.declare(
    {
        require: 
        [
            'shared.model.local.LocalWatchHistoryProxy'
        ],
        name: 'shared.model.WatchHistoryProxy',
        as: function() 
        {
        
            // Noop
            
        }
    });
}