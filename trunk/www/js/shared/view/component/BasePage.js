jingo.declare(
{
    require: 
    [
        "shared.view.component.UIComponent"
    ],
    name: 'shared.view.component.BasePage',
    as: function() 
    {

        shared.view.component.BasePage = function(canvas)
        {
            shared.view.component.UIComponent.apply(this, []);
    
            if (canvas)
            {
                this.context = canvas.context;
                this.box2dWorld = canvas.world;
                this._mouseX = undefined;
                this._mouseY = undefined;
                this._mouseStartX = undefined;
                this._mouseStartY = undefined;
                this._mousePVec = undefined;
                this._isMouseDown = false;
                this._selectedBody = undefined;
            }
        }

        shared.view.component.BasePage.prototype = new shared.view.component.UIComponent;
        shared.view.component.BasePage.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.BasePage.prototype.constructor = shared.view.component.BasePage;

        shared.view.component.BasePage.BODY_SELECTED = "bodySelected";

        // Mouse move sensitivity (a lower number is more sensitive)
        shared.view.component.BasePage.MOUSE_MOVE_SENSITIVITY = 0.5;

        shared.view.component.BasePage.prototype.setBackgroundImage = function(backgroundImageSrc)
        {
            $('body').css('backgroundImage','url(' + backgroundImageSrc + ')');
        }

        shared.view.component.BasePage.prototype.isMouseDown = function()
        {
            return this._isMouseDown;
        }

        shared.view.component.BasePage.prototype.getMouseX = function()
        {
            return this._mouseX;
        }

        shared.view.component.BasePage.prototype.getMouseY = function()
        {
            return this._mouseY;
        }

        shared.view.component.BasePage.prototype.getMouseStartX = function()
        {
            return this._mouseStartX;
        }

        shared.view.component.BasePage.prototype.getMouseStartY = function()
        {
            return this._mouseStartY;
        }

        shared.view.component.BasePage.prototype.getSelectedBody = function()
        {
            return this._selectedBody;
        }

        shared.view.component.BasePage.prototype.onPageEnter = function(data)
        {
            //any initialization code
    
            this._doPageEnter(data);
        }

        shared.view.component.BasePage.prototype.onPageExit = function()
        {
            this._doPageExit();
        }

        shared.view.component.BasePage.prototype.update = function()
        {
            this._doUpdate();
            //this.int = window.setInterval(Relegate.create(this, this._doUpdate, this),1000/60);
        }

        shared.view.component.BasePage.prototype._doUpdate = function()
        {
            //to be overridden
        }

        shared.view.component.BasePage.prototype._doPageEnter = function(data)
        {
            //to be overridden
        }

        shared.view.component.BasePage.prototype._doPageExit = function()
        {
            //to be overridden
        }

        shared.view.component.BasePage.prototype.onBodySelected = function(body)
        {
            //to be overriden
        }

        shared.view.component.BasePage.prototype.onTouchStarted = function(mouseX, mouseY)
        {
            //console.log("shared.view.component.BasePage.onTouchStarted: mouseX = " + mouseX + "; mouseY = " + mouseY);
    
            this._isMouseDown = true;
            this._mouseX = mouseX;
            this._mouseY = mouseY;
            this._mouseStartX = this._mouseX;
            this._mouseStartY = this._mouseY;
    
            this._selectedBody = this.getBodyAtMouse();
        }

        shared.view.component.BasePage.prototype.onTouchMoved = function(mouseX, mouseY)
        {
            //console.log("shared.view.component.BasePage.onTouchMoved: mouseX = " + mouseX + "; mouseY = " + mouseY);
    
            this._mouseX = mouseX;
            this._mouseY = mouseY;
        }

        shared.view.component.BasePage.prototype.onTouchEnded = function() 
        {
            //console.log("shared.view.component.BasePage.onTouchEnded: mouseStartX = " + this._mouseStartX + "; mouseStartY = " + this._mouseStartY + "; mouseX = " + this._mouseX + "; mouseY = " + this._mouseY);
    
            var moveDistance = this.distanceBetweenPoints(this._mouseStartX, this._mouseStartY, this._mouseX, this._mouseY);
    
            //console.log("shared.view.component.BasePage.onTouchEnded: moveDistance = " + moveDistance);
    
            var shouldCheckForSelection = (moveDistance <= shared.view.component.BasePage.MOUSE_MOVE_SENSITIVITY);
    
            this._isMouseDown = false;
            this._mouseX = undefined;
            this._mouseY = undefined;
            this._mouseStartX = undefined;
            this._mouseStartY = undefined;
            this._mousePVec = undefined;
    
            var currentBody = this._selectedBody;
            this._selectedBody = undefined;
    
            if (shouldCheckForSelection && currentBody)
            {
                console.log("shared.view.component.BasePage.onTouchEnded: BODY SELECTED: currentBody = " + currentBody);
        
                this.onBodySelected(currentBody);
            }
        }

        shared.view.component.BasePage.prototype.getBodyCB = function(fixture)
        {
            if (fixture.GetBody().GetType() != b2Body.b2_staticBody)
            {
                if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), this._mousePVec))
                {
                    this._tempSelectedBody = fixture.GetBody();
                    return false;
                }
            }
            return true;
        }

        shared.view.component.BasePage.prototype.getBodyAtMouse = function()
        {
            this._mousePVec = new b2Vec2(this._mouseX, this._mouseY);
            var aabb = new b2AABB();
            aabb.lowerBound.Set(this._mouseX - 0.001, this._mouseY - 0.001);
            aabb.upperBound.Set(this._mouseX + 0.001, this._mouseY + 0.001);
    
            // Query the world for overlapping shapes.
    
            this._tempSelectedBody = null;
            this.box2dWorld.QueryAABB(Relegate.create(this, this.getBodyCB, this), aabb);
    
            var returnValue = this._tempSelectedBody;
            this._tempSelectedBody = null;
            return returnValue;
        }

        shared.view.component.BasePage.prototype.distanceBetweenPoints = function(startX, startY, endX, endY)
        {
            var xs = 0;
            var ys = 0;
    
            xs = endX - startX;
            xs = xs * xs;
    
            ys = endY - startY;
            ys = ys * ys;
    
            return Math.sqrt(xs + ys);
        }
    
    }
});

