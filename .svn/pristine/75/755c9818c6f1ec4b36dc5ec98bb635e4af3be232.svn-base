jingo.declare(
{
    require: 
    [
        "shared.view.mediator.BasePageMediator",
        "shared.view.component.LoginPage",
        "shared.view.component.Sounds"
    ],
    name: 'shared.view.mediator.LoginPageMediator',
    as: function() 
    {

        shared.view.mediator.LoginPageMediator = function(viewComponent)
        {
            shared.view.mediator.BasePageMediator.apply(this, [shared.view.mediator.LoginPageMediator.NAME, viewComponent]);
    
            if (this.getView())
            {
                this.getView().addEventListener(shared.view.component.LoginPage.LOGIN_TILE_SELECTED, Relegate.create(this, this.onLoginTileSelected, this));
                this.getView().addEventListener(shared.view.component.LoginPage.CLEANUP_FINISHED, Relegate.create(this, this.onCleanupFinished, this));
            }
        }

        shared.view.mediator.LoginPageMediator.prototype = new shared.view.mediator.BasePageMediator;
        shared.view.mediator.LoginPageMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        shared.view.mediator.LoginPageMediator.prototype.constructor = shared.view.mediator.LoginPageMediator;

        shared.view.mediator.LoginPageMediator.NAME = "LoginPageMediator";

        shared.view.mediator.LoginPageMediator.prototype.getName = function()
        {
            return shared.view.mediator.LoginPageMediator.NAME;
        }

        shared.view.mediator.LoginPageMediator.prototype.onLoginTileSelected = function()
        {
            shared.view.component.Sounds.playTouch();
            var selTile = this.getView().selectedTile;
            console.log('User selected for login: ' + selTile.username);
            //JA - we are just hardcoding 'test' as the password for everyuser, otherwise they will have to enter it.
            this.sendNotification(AppConstants.LOGIN_USER, {username: selTile.username, password: 'test'});
        }

        shared.view.mediator.LoginPageMediator.prototype.onCleanupFinished = function()
        {
            this.sendNotification(AppConstants.PAGE_CLEANUP_FINISHED, {});
        }
        
    }
});

