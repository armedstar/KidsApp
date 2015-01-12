jingo.declare(
{
    require: 
    [
        "shared.model.AuthenticationProxy",
        "shared.model.ApplicationLoggingProxy",
        "shared.model.RecommendationsProxy",
        "shared.model.RCSProxy",
        "shared.model.WatchHistoryProxy",
        "shared.model.ThemeProxy"
    ],
    name: 'shared.controller.PrepModelCommand',
    as: function() 
    {

        shared.controller.PrepModelCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.PrepModelCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.PrepModelCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.PrepModelCommand.prototype.constructor = shared.controller.PrepModelCommand;
        
        shared.controller.PrepModelCommand.prototype.execute = function(notification)
        {
            console.log("PrepModel executed");
    
            if (!DEBUG_USE_OFFLINE_PROXY_MODE)
            {
                //initialize Parse data service
                //Parse.initialize("OVKCeZUq3DaYyWdUx16ZNhtBLUntpdemxzADluaA", "HfWP3tkp3CuRJlIBTMkL7C2cNyNi4HUMnKeh9dLb");  // Playskool
                Parse.initialize("5kztLw44aLzgoAKTz1adry8I3JXjzxqaBRSWDuIw", "vJVZrgtK4EPd5auc4XjbRngX1Nhi9yTE9IkrOAF3");  // Playskool-Research
                //Parse.initialize("WjrJS7OCMGfQwBEDr49ZKr1ERbbgSKhl69PbP9UA", "Xdl6hPeKmzoxWDjM02rSOsSjweGKuv6Flq5UFR84");  // Playskool-Research-B
                //Parse.initialize("0UDyiaboOc49zQEB3YZBnd6aiCTNngHMVTLZzZBP", "nLgbBem5jZj6O74SqvXLL2VH8X9HDGfbT2Y4BX2V");  // Playskool-Sales
            }
    
            //TODO: register proxies for data access
            this.facade.registerProxy(new shared.model.AuthenticationProxy());
            this.facade.registerProxy(new shared.model.ApplicationLoggingProxy());
            this.facade.registerProxy(new shared.model.RecommendationsProxy());
            this.facade.registerProxy(new shared.model.RCSProxy());
            this.facade.registerProxy(new shared.model.WatchHistoryProxy());
        }
        
    }
});

