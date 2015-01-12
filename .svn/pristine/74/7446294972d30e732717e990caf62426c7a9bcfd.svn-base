jingo.declare(
{
    require: 
    [
        'shared.constants',
        'shared.model.AuthenticationProxy',
        'shared.model.ResourceProxy',
        'ages_all.controller.AAStartupCommand'
    ],
    name: 'ages_all.AgesAllApp',
    as: function() 
    {
    
        ApplicationFacade = function(key)
        {
            puremvc.Facade.apply(this, arguments);
            this.familyId = null;
            this.notifySMS = null;
            this.notifyParentOfVideos = false;
        }
    
        ApplicationFacade.prototype = new puremvc.Facade;
        ApplicationFacade.prototype.parent = puremvc.Facade.prototype;
        ApplicationFacade.prototype.constructor = ApplicationFacade;

        ApplicationFacade.APP_NAME = "PLAYSKOOL-AgesAll";

        ApplicationFacade.prototype.familyId = null;
        ApplicationFacade.prototype.notifySMS = null;
        ApplicationFacade.prototype.notifyParentOfVideos;

        ApplicationFacade.getInstance = function(key)
        {
            if (!puremvc.Facade.hasCore(key))
            {
                new ApplicationFacade(key);
            }
            var retVal = puremvc.Facade.getInstance(key);
            return retVal;
        }

        ApplicationFacade.prototype.startup = function()
        {
            var onInitFinished = Relegate.create(
                this,
                function() 
                {
                    this.sendNotification(AppConstants.STARTUP);
                },
                this);
        
            // Initialize pre-startup proxies
            this.registerProxy(new shared.model.ResourceProxy());
            var resourceProxy = this.retrieveProxy(shared.model.ResourceProxy.NAME);
            resourceProxy.init(onInitFinished);
        }

        ApplicationFacade.prototype.initializeController = function()
        {
            puremvc.Facade.prototype.initializeController.call(this);
            this.registerCommand(AppConstants.STARTUP, ages_all.controller.AAStartupCommand);
        }

        ApplicationFacade.prototype.getCurrentUser = function()
        {
            var user = null;
    
            var authProxy = this.retrieveProxy(shared.model.AuthenticationProxy.NAME);
            if (authProxy)
            {
                user = authProxy.getCurrentUser();
            }
            return user;
        }
        
    }
});




