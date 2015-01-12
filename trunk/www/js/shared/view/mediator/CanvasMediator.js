jingo.declare(
{
    require: 
    [
        "shared.view.component.Canvas"
    ],
    name: 'shared.view.mediator.CanvasMediator',
    as: function() 
    {
    
        shared.view.mediator.CanvasMediator = function(viewComponent)
        {
            puremvc.Mediator.apply(this, [shared.view.mediator.CanvasMediator.NAME, viewComponent]);
    
            this.pageStack = new Array();
            this.pageToUpdate = null;
    
            this._canvasUpdateHandler = Relegate.create(this, this._onCanvasUpdate, this);
            this._touchStartedHandler = Relegate.create(this, this._onTouchStarted, this);
            this._touchMovedHandler = Relegate.create(this, this._onTouchMoved, this);
            this._touchEndedHandler = Relegate.create(this, this._onTouchEnded, this);

            if (this.getView())
            {
                this.getView().addEventListener(shared.view.component.Canvas.CANVAS_UPDATE, this._canvasUpdateHandler);
                this.getView().addEventListener(shared.view.component.Canvas.TOUCH_STARTED, this._touchStartedHandler);
                this.getView().addEventListener(shared.view.component.Canvas.TOUCH_MOVED, this._touchMovedHandler);
                this.getView().addEventListener(shared.view.component.Canvas.TOUCH_ENDED, this._touchEndedHandler);
            }
        }

        shared.view.mediator.CanvasMediator.prototype = new puremvc.Mediator;
        shared.view.mediator.CanvasMediator.prototype.parent = puremvc.Mediator.prototype;
        shared.view.mediator.CanvasMediator.prototype.constructor = shared.view.mediator.CanvasMediator;

        shared.view.mediator.CanvasMediator.NAME = "CanvasMediator";
        
        shared.view.mediator.CanvasMediator.prototype.getView = function()
        {
            return this.viewComponent;
        }

        shared.view.mediator.CanvasMediator.prototype.getCurrentPage = function()
        {
            if (this.pageStack && this.pageStack.length > 0)
            {
                return this.pageStack[this.pageStack.length - 1];
            }
            else
                return undefined;
        }

        shared.view.mediator.CanvasMediator.prototype.hide = function()
        {
            this.getView().hide();
            this.getView().removeEventListener(shared.view.component.Canvas.CANVAS_UPDATE, this._canvasUpdateHandler);
            this.getView().removeEventListener(shared.view.component.Canvas.TOUCH_STARTED, this._touchStartedHandler);
            this.getView().removeEventListener(shared.view.component.Canvas.TOUCH_MOVED, this._touchMovedHandler);
            this.getView().removeEventListener(shared.view.component.Canvas.TOUCH_ENDED, this._touchEndedHandler);
        }

        shared.view.mediator.CanvasMediator.prototype.show = function()
        {
            this.getView().show();
            this.getView().addEventListener(shared.view.component.Canvas.CANVAS_UPDATE, this._canvasUpdateHandler);
            this.getView().addEventListener(shared.view.component.Canvas.TOUCH_STARTED, this._touchStartedHandler);
            this.getView().addEventListener(shared.view.component.Canvas.TOUCH_MOVED, this._touchMovedHandler);
            this.getView().addEventListener(shared.view.component.Canvas.TOUCH_ENDED, this._touchEndedHandler);
        }

        shared.view.mediator.CanvasMediator.prototype.popPage = function()
        {
            var curPage = this.pageStack.pop();
            if (curPage)
                curPage.hidePage();
    
            var newPage = this.getCurrentPage();
            if (newPage)
                newPage.showPage();
        }

        shared.view.mediator.CanvasMediator.prototype.clearAllPages = function()
        {
            var currPage = this.getCurrentPage();
            if (currPage)
                currPage.hidePage();
    
            this.pageStack = new Array();
        }

        shared.view.mediator.CanvasMediator.prototype._onCanvasUpdate = function()
        {
            if (this.pageToUpdate)
            {
                this.pageToUpdate.updatePage();
            }
        }

        shared.view.mediator.CanvasMediator.prototype._onTouchStarted = function(event)
        {
            //console.log("shared.view.mediator.CanvasMediator._onTouchStarted: mouseX = " + event.args.mouseX + "; mouseY = " + event.args.mouseY);
            var currPage = this.getCurrentPage();
            if (currPage)
            {
                currPage.mediator.onTouchStarted(event.args.mouseX, event.args.mouseY);
            }
        }

        shared.view.mediator.CanvasMediator.prototype._onTouchMoved = function(event)
        {
            //console.log("shared.view.mediator.CanvasMediator._onTouchMoved: mouseX = " + event.args.mouseX + "; mouseY = " + event.args.mouseY);
            var currPage = this.getCurrentPage();
            if (currPage)
            {
                currPage.mediator.onTouchMoved(event.args.mouseX, event.args.mouseY);
            }
        }

        shared.view.mediator.CanvasMediator.prototype._onTouchEnded = function(event)
        {
            //console.log("shared.view.mediator.CanvasMediator._onTouchEnded:");
            var currPage = this.getCurrentPage();
            if (currPage)
            {
                currPage.mediator.onTouchEnded();
            }
        }

        shared.view.mediator.CanvasMediator.prototype.listNotificationInterests = function()
        {
            return [AppConstants.SHOW_PAGE, AppConstants.PAGE_CLEANUP_FINISHED];
        }

        shared.view.mediator.CanvasMediator.prototype.handleNotification = function(notification)
        {
            switch(notification.getName())
            {
                case AppConstants.SHOW_PAGE:
                    var currPage = this.getCurrentPage();
            
                    var newPageMediator = notification.getBody().pageMediator;
                    var newUserData = notification.getBody().userData;
                    var newPageData = notification.getBody().pageData;
                    var refreshPage = notification.getBody().refreshPage;
            
                    this.pageStack.push({ mediator: newPageMediator, userData: newUserData, pageData: newPageData, refreshPage: refreshPage });
            
                    if (currPage)
                    {
                        if ((newPageMediator != currPage.mediator) || refreshPage)
                        {
                            //Hide previous page and wait for it to cleanup (via CLEANUP_FINISHED message)
                            currPage.mediator.hidePage();
                        }
                        else
                        {
                            this.pageToUpdate = newPageMediator;
                            newPageMediator.showPage({userData: newUserData, pageData: newPageData, refreshPage: refreshPage});
                        }
                    }
                    else
                    {
                        //NO previous page...show immediately
                        this.pageToUpdate = newPageMediator;
                        newPageMediator.showPage({userData: newUserData, pageData: newPageData, refreshPage: refreshPage});
                    }
                        
                    if (this.getView().updateInt == null)
                        this.getView().startCanvasUpdate();
                    
                    break;
            
                case AppConstants.PAGE_CLEANUP_FINISHED:
                    console.log("CLEANUP FINISHED FOR: " + this.pageToUpdate.getName());
                    this.getView().stopCanvasUpdate();
            
                    var nextPage = this.getCurrentPage();
                    if (nextPage)
                    {
                        this.pageToUpdate = nextPage.mediator;
                        nextPage.mediator.showPage({userData: nextPage.userData, pageData: nextPage.pageData, refreshPage: nextPage.refreshPage});
                
                        if (this.getView().updateInt == null)
                            this.getView().startCanvasUpdate();
                    }
                    break;
            
            }
        }
        
    }
});
