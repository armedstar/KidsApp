if (!DEBUG_USE_OFFLINE_PROXY_MODE)
{
    jingo.declare(
    {
        require: 
        [
            'shared.model.remote.RemoteAuthenticationProxy'
        ],
        name: 'shared.model.AuthenticationProxy',
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
            'shared.model.local.LocalAuthenticationProxy'
        ],
        name: 'shared.model.AuthenticationProxy',
        as: function() 
        {
        
            // Noop
            
        }
    });
}