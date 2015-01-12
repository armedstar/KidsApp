jingo.declare(
{
    require: 
    [
        "shared.model.ProgramBrief",
        "shared.model.ResourceProxy"
    ],
    name: 'shared.model.remote.RemoteRecommendationsProxy',
    as: function() 
    {

        shared.model.RecommendationsProxy = function()
        {
            puremvc.Proxy.apply(this, [shared.model.RecommendationsProxy.NAME, new Array()]);
        }

        shared.model.RecommendationsProxy.prototype = new puremvc.Proxy;
        shared.model.RecommendationsProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.RecommendationsProxy.prototype.constructor = shared.model.RecommendationsProxy;
        
        shared.model.RecommendationsProxy.NAME = "RecommendationsProxy";
        
        shared.model.RecommendationsProxy.prototype.getRecommendations = function(userId, contextId, successCallback, failCallback)
        {
            if (DEVICE_MODE_ENABLED)
            {
                window.plugins.ApplicationPreferences.getAsBoolean(
                    'override_video', 
                    Relegate.create(this, this._getRecommendationsInternal, userId, contextId, successCallback, failCallback),
                    Relegate.create(
                        this,
                        function() 
                        {
                            console.log('Unable to get override video value.  Make sure the value is set in the Settings application.');
                            this._getRecommendationsInternal(OVERRIDE_CONTENT_VIDEO, userId, contextId, successCallback, failCallback);
                        }, 
                        this));
            }
            else
            {  
                this._getRecommendationsInternal(OVERRIDE_CONTENT_VIDEO, userId, contextId, successCallback, failCallback);
            }
        }
        
        shared.model.RecommendationsProxy.prototype._getRecommendationsInternal = function(overrideVideo, userId, contextId, successCallback, failCallback)
        {
            var resourceProxy = this.facade.retrieveProxy(shared.model.ResourceProxy.NAME);
            
            var testData = new Array();
            
            var onSuccess = Relegate.create(
                this,
                function(list) 
                {
                    for (var i = 0; i < list.length; i++) 
                    {
                        var title = list[i];
                        var programTitle = title.get("title");
                        var parentProgram = title.get("parentProgram");
                        var seriesTitle = (parentProgram) ? parentProgram.get("title") : programTitle;
                        var progBrief = new shared.model.ProgramBrief(
                            title.id, 
                            programTitle, 
                            title.get("mediatype"), 
                            resourceProxy.resolveResourceURL(title.get("primaryImageURL")),
                            resourceProxy.resolveResourceURL(title.get("mediumImageURL")),
                            resourceProxy.resolveResourceURL(title.get("smallImageURL")),
                            resourceProxy.resolveResourceURL(title.get("videoPlayerCtrlImageURL")), 
                            (overrideVideo) ? OVERRIDE_CONTENT_VIDEO_URL : resourceProxy.resolveResourceURL(title.get("videoURL")),
                            title.get("parentProgram"),
                            seriesTitle);
                        testData.push(progBrief);
                    }
                    successCallback(testData);
                },
                this);
    
            Parse.Cloud.run(
                'recommendations', 
                { 
                    userId: userId,
                    contextId: contextId
                }, 
                {
                    success: onSuccess,
                    error: function(err) 
                    {
                        console.log("Unable to obtain program list: userId = " + userId + "; contextId = " + contextId + "; err = " + err.message);
                        failCallback(err);
                    }
                });
        }
        
    }
});
