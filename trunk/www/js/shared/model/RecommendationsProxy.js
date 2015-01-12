if (!DEBUG_USE_OFFLINE_PROXY_MODE)
{
    jingo.declare(
    {
        require: 
        [
            'shared.model.remote.RemoteRecommendationsProxy'
        ],
        name: 'shared.model.RecommendationsProxy',
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
            'shared.model.local.LocalRecommendationsProxy'
        ],
        name: 'shared.model.RecommendationsProxy',
        as: function() 
        {
        
            // Noop
            
        }
    });
}