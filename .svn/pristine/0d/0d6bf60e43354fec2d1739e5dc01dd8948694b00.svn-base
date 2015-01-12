jingo.declare(
{
    require: 
    [
        "shared.view.component.UIComponent",
        "shared.view.component.Canvas"
    ],
    name: 'shared.view.component.LoginTile',
    as: function() 
    {

        shared.view.component.LoginTile = function(box2dWorld, id, username, displayName, positionX, positionY)
        {
            shared.view.component.UIComponent.apply(this, null);
            this.box2dWorld = box2dWorld;
    
            this.positionX = positionX;
            this.positionY = positionY;
    
            this.id = id;
            this.username = username;
            this.displayName = displayName;
    
            this.loginBoxImage = new Image();
            this.loginBoxImage.src = 'images/pages/shared/login/loginBox.png';
    
        }

        shared.view.component.LoginTile.prototype = new shared.view.component.UIComponent;
        shared.view.component.LoginTile.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.LoginTile.prototype.constructor = shared.view.component.LoginTile;

        shared.view.component.LoginTile.prototype.box = null;

        shared.view.component.LoginTile.prototype.create = function()
        {
            var boxDef = new b2BodyDef;
            boxDef.type = b2Body.b2_dynamicBody;
            boxDef.position.x = this.positionX;
            boxDef.position.y = this.positionY;
            boxDef.userData = this.id;
    
            var fixtureDef = new b2FixtureDef;
            fixtureDef.density = 1.0;
            fixtureDef.friction = 0.5;
            fixtureDef.restitution = 0.2;
            fixtureDef.shape = new b2PolygonShape;
            fixtureDef.shape.SetAsBox(10,2.5);
    
            this.box = this.box2dWorld.CreateBody(boxDef);
    
            this.box.CreateFixture(fixtureDef);
    
            return this.box;
        }

        shared.view.component.LoginTile.prototype.drawBox = function(context)
        {
            context.drawImage(this.loginBoxImage, -250, -90);
        }

        shared.view.component.LoginTile.prototype.drawUserName = function(context)
        {
            context.font = 'bold 30px sans-serif';
            context.fillStyle = 'FFFFFF';
            context.fillText(this.displayName, -200, 0);
        }

        shared.view.component.LoginTile.prototype.update = function(context)
        {
            // TODO: (WK) Move this into some base class.
            var pos = this.box.GetPosition();
            context.translate(pos.x * shared.view.component.Canvas.SCALE, pos.y * shared.view.component.Canvas.SCALE);
            context.rotate(this.box.GetAngle());
        
            this.drawBox(context);
            this.drawUserName(context);
        }
        
    }
});
