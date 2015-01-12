jingo.declare(
{
    require: 
    [
        "shared.view.component.BasePage"
    ],
    name: 'shared.view.mediator.BasePageMediator',
    as: function() 
    {

        shared.view.mediator.BasePageMediator = function(mediatorName, viewComponent)
        {
            puremvc.Mediator.apply(this, [mediatorName, viewComponent]);
        }

        shared.view.mediator.BasePageMediator.prototype = new puremvc.Mediator;
        shared.view.mediator.BasePageMediator.prototype.parent = puremvc.Mediator.prototype;
        shared.view.mediator.BasePageMediator.prototype.constructor = shared.view.mediator.BasePageMediator;

        shared.view.mediator.BasePageMediator.prototype.getView = function()
        {
            return this.viewComponent;
        }

        shared.view.mediator.BasePageMediator.prototype.getName = function()
        {
            //to be overridden
            return null;
        }

        shared.view.mediator.BasePageMediator.prototype.showPage = function(data)
        {
            this.contextData = this._formatData(data);
    
            this.getView().addEventListener(shared.view.component.BasePage.BODY_SELECTED, this._bodySelectionHandler);
    
            this.getView().onPageEnter(this.contextData);
            //this.getView().update(this.contextData);
        }

        shared.view.mediator.BasePageMediator.prototype.updatePage = function()
        {
            this.getView().update();
        }

        shared.view.mediator.BasePageMediator.prototype._formatData = function(data)
        {
            //to be overriden
            return data;
        }


        shared.view.mediator.BasePageMediator.prototype.hidePage = function()
        {
            
            this.getView().removeEventListener(shared.view.component.BasePage.BODY_SELECTED, this._bodySelectionHandler);
    
            this.getView().onPageExit();
        }

        shared.view.mediator.BasePageMediator.prototype.refresh = function()
        {
            this.hidePage();
            this.showPage(this.contextData);
        }

        shared.view.mediator.BasePageMediator.prototype.onBodySelected = function(event)
        {
            console.log("shared.view.mediator.BasePageMediator.onBodySelected: body = " + event.args.selectedBody);

            //this.getView().onBodySelected(body);
        }

        shared.view.mediator.BasePageMediator.prototype.onTouchStarted = function(mouseX, mouseY)
        {
            //console.log("shared.view.mediator.BasePageMediator.onTouchStarted: mouseX = " + mouseX + "; mouseY = " + mouseY);
            this.getView().onTouchStarted(mouseX, mouseY);
        }

        shared.view.mediator.BasePageMediator.prototype.onTouchMoved = function(mouseX, mouseY)
        {
            //console.log("shared.view.mediator.BasePageMediator.onTouchMoved: mouseX = " + mouseX + "; mouseY = " + mouseY);
            this.getView().onTouchMoved(mouseX, mouseY);
        }

        shared.view.mediator.BasePageMediator.prototype.onTouchEnded = function()
        {
            //console.log("shared.view.mediator.BasePageMediator.onTouchEnded:");
            this.getView().onTouchEnded();
        }
        
    }
});