if (!DEBUG_USE_OFFLINE_PROXY_MODE)
{
    jingo.declare(
    {
        require: 
        [
            'shared.model.remote.RemoteApplicationLoggingProxy'
        ],
        name: 'shared.model.ApplicationLoggingProxy',
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
            'shared.model.local.LocalApplicationLoggingProxy'
        ],
        name: 'shared.model.ApplicationLoggingProxy',
        as: function() 
        {
        
            // Noop
            
        }
    });
}