jingo.declare(
{
    require: 
    [
        "shared.model.User"
    ],
    name: 'shared.model.local.LocalRCSProxy',
    as: function() 
    {

        shared.model.RCSProxy = function()
        {
            puremvc.Proxy.apply(this, [shared.model.RCSProxy.NAME, new Array()]);
        }

        shared.model.RCSProxy.prototype = new puremvc.Proxy;
        shared.model.RCSProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.RCSProxy.prototype.constructor = shared.model.RCSProxy;
        
        shared.model.RCSProxy.NAME = "RCSProxy";

        shared.model.RCSProxy.prototype.getMovieInfo = function(entityId, successCallback, failureCallback)
        {
            //TODO (JA): Need to add logic to read details (e.g. episodes, etc.) from external file.
            var testDetailsObj = {
                id: entityId,
                title: 'The Lion King',
                synopsis: 'Cute movie if you like Elton John.'
            };
    
            successCallback(testDetailsObj);
        }

        shared.model.RCSProxy.prototype.getTVSeriesInfo = function(entityId, successCallback, failureCallback)
        {
            //TODO (JA): Need to add logic to read details (e.g. episodes, etc.) from external file.
    
            var testDetailsObj = {
                id: entityId,
                title: 'Sesame Street',
                synopsis: 'Beloved kids programming that will soon be out of funding if Mitt Romney wins the election.'
            };
    
            successCallback(testDetailsObj);
        }

        shared.model.RCSProxy.prototype.getEpisodesForSeries = function(series, successCallback, failureCallback)
        {
            var testData = new Array();
            successCallback(testData);
        }
        
    }
});
