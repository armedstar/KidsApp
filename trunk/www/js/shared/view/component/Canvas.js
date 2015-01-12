jingo.declare(
{
    require: 
    [
        "shared.view.component.UIComponent"
    ],
    name: 'shared.view.component.Canvas',
    as: function() 
    {

        shared.view.component.Canvas = function(canvasElem)
        {
            // TODO: (WK) Separate this code out so that the "world" and event instantiation is not triggered until actual render.
            //       Otherwise, we have gravity events processing while the page isn't even on screen.
            shared.view.component.UIComponent.apply(this, arguments);

            this.canvasElem = canvasElem;
            this.context = this.canvasElem.getContext("2d");
            this.world = new b2World(new b2Vec2(0, shared.view.component.Canvas.GRAVITY_Y), true);
    
    
            //Used to determine what body user touches
            this.canvasPosition = getElementPosition(this.canvasElem);
            this.mouse = new MouseAndTouch(document, Relegate.create(this, this.onTouchStart, this),
                                           Relegate.create(this, this.onTouchUp, this),
                                           Relegate.create(this, this.onTouchMove, this));
            this.updateInt = null;
    
            var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite (this.context);
            debugDraw.SetDrawScale(shared.view.component.Canvas.SCALE);     //define scale
            debugDraw.SetFillAlpha(0.3);    //define transparency
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            if (DEBUG_DRAW_ENABLED)
            {
                this.world.SetDebugDraw(debugDraw);
            }
        }

        shared.view.component.Canvas.prototype = new shared.view.component.UIComponent;
        shared.view.component.Canvas.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.Canvas.prototype.constructor = shared.view.component.Canvas;

        shared.view.component.Canvas.SCALE = 30;
        shared.view.component.Canvas.BODY_SELECTED = "tileSelected";
        shared.view.component.Canvas.CANVAS_UPDATE = "canvasUpdate";
        shared.view.component.Canvas.TOUCH_STARTED = "touchStarted";
        shared.view.component.Canvas.TOUCH_MOVED = "touchMoved";
        shared.view.component.Canvas.TOUCH_ENDED = "touchEnded";
        shared.view.component.Canvas.GRAVITY_Y = 50;

        // Shake sensitivity (a lower number is more sensitive)
        shared.view.component.Canvas.SHAKE_SENSITIVITY = 15;

        shared.view.component.Canvas.prototype.startCanvasUpdate = function()
        {
            this.updateInt = window.setInterval(Relegate.create(this, this.onCanvasUpdate, this),1000/60);
        }

        shared.view.component.Canvas.prototype.stopCanvasUpdate = function()
        {
            window.clearInterval(this.updateInt);
            this.updateInt = null;
        }

        shared.view.component.Canvas.prototype.onCanvasUpdate = function()
        {
            this.world.Step(1 / 60, 10, 10);
            this.world.ClearForces();
            this.context.clearRect(0, 0, 1024, 768);
            if (DEBUG_DRAW_ENABLED)
            {
                this.world.DrawDebugData();
            }
    
            this.dispatchEvent(shared.view.component.Canvas.CANVAS_UPDATE, null);
        }

        shared.view.component.Canvas.prototype.onTouchStart = function(x,y)
        {
            var mouseX = this._convertTouchRelativeToCanvas(x, this.canvasPosition.x);
            var mouseY = this._convertTouchRelativeToCanvas(y, this.canvasPosition.y);
    
            this.dispatchEvent(shared.view.component.Canvas.TOUCH_STARTED, { mouseX : mouseX, mouseY : mouseY });
        }

        shared.view.component.Canvas.prototype.onTouchMove = function(x,y)
        {
            var mouseX = this._convertTouchRelativeToCanvas(x, this.canvasPosition.x);
            var mouseY = this._convertTouchRelativeToCanvas(y, this.canvasPosition.y);
    
            this.dispatchEvent(shared.view.component.Canvas.TOUCH_MOVED, { mouseX : mouseX, mouseY : mouseY });
        }

        shared.view.component.Canvas.prototype._convertTouchRelativeToCanvas = function(touchPosition, canvasPosition)
        {
            return (touchPosition - canvasPosition) / shared.view.component.Canvas.SCALE;
        }

        shared.view.component.Canvas.prototype.onTouchUp = function(x, y) 
        {
            this.dispatchEvent(shared.view.component.Canvas.TOUCH_ENDED);
        }

        shared.view.component.Canvas.prototype.hide = function()
        {
            this.canvasElem.setAttribute("style", "display:none;");
        }

        shared.view.component.Canvas.prototype.show = function()
        {
            this.canvasElem.setAttribute("style", "display:block;");
        }
        
    }
});