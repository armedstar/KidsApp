includeJS("js/ces/model/CESAuthenticationProxy.js");
includeJS("js/shared/model/ApplicationLoggingProxy.js");
includeJS("js/ces/model/CESRecommendationsProxy.js");
includeJS("js/shared/model/RCSProxy.js");
includeJS("js/shared/model/WatchHistoryProxy.js");

CESPrepModelCommand.prototype = new puremvc.SimpleCommand;

function CESPrepModelCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

CESPrepModelCommand.prototype.execute = function(notification)
{
    console.log("CESPrepModelCommand executed");
    
    //TODO: register proxies for data access
    this.facade.registerProxy(new CESAuthenticationProxy());
    this.facade.registerProxy(new ApplicationLoggingProxy());
    this.facade.registerProxy(new CESRecommendationsProxy());
    this.facade.registerProxy(new RCSProxy());
    this.facade.registerProxy(new WatchHistoryProxy());
}


