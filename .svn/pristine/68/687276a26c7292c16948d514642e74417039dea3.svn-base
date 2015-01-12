jingo.declare(
{
    require: 
    [
        "shared.model.ProgramBrief",
        "shared.model.ResourceProxy"
    ],
    name: 'shared.model.remote.RemoteRCSProxy',
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
            if (DEVICE_MODE_ENABLED)
            {
                window.plugins.ApplicationPreferences.getAsBoolean(
                    'override_video', 
                    Relegate.create(this, this._getEpisodesForSeriesInternal, series, successCallback, failureCallback),
                    Relegate.create(
                        this,
                        function() 
                        {
                            console.log('Unable to get override video value.  Make sure the value is set in the Settings application.');
                            this._getEpisodesForSeriesInternal(OVERRIDE_CONTENT_VIDEO, series, successCallback, failureCallback);
                        }, 
                        this));
            }
            else
            {  
                this._getEpisodesForSeriesInternal(OVERRIDE_CONTENT_VIDEO, series, successCallback, failureCallback);
            }
        }
        
        shared.model.RCSProxy.prototype._getEpisodesForSeriesInternal = function(overrideVideo, series, successCallback, failureCallback)
        {
            var resourceProxy = this.facade.retrieveProxy(shared.model.ResourceProxy.NAME);
            
            var retData = new Array();
            
            var onSuccess = Relegate.create(
                this,
                function(programs) 
                {
                    for (var i = 0; i < programs.length; i++)
                    {
                        var prog = programs[i];
                        var progBrief = new shared.model.ProgramBrief(
                            prog.id,
                            prog.get("title"),
                            prog.get("mediatype"),
                            resourceProxy.resolveResourceURL(prog.get("primaryImageURL")),
                            resourceProxy.resolveResourceURL(prog.get("mediumImageURL")),
                            resourceProxy.resolveResourceURL(prog.get("smallImageURL")),
                            resourceProxy.resolveResourceURL(prog.get("videoPlayerCtrlImageURL")),
                            (overrideVideo) ? OVERRIDE_CONTENT_VIDEO_URL : resourceProxy.resolveResourceURL(prog.get("videoURL")),
                            prog.get("parentProgram"));
                        retData.push(progBrief);
                    }
                    successCallback(retData);
                },
                this);
        
            var Program = Parse.Object.extend("Program");
            var innerQuery = new Parse.Query(Program);
            innerQuery.equalTo("objectId", series.id);
            var query = new Parse.Query(Program);
            query.matchesQuery("parentProgram", innerQuery);
            query.find(
            {
                success: onSuccess,
                error: function(error) { failureCallback(error); }
            });
        }
        
    }
});