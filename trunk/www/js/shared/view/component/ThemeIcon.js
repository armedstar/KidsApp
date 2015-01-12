jingo.declare(
{
    require: 
    [
        "shared.view.component.UIComponent",
        "shared.view.component.Canvas"
    ],
    name: 'shared.view.component.ThemeIcon',
    as: function() 
    {

        shared.view.component.ThemeIcon = function(
            box2dWorld, 
            userId, 
            positionX, 
            positionY, 
            displayName,  
            iconImageSrc)
        {
            shared.view.component.UIComponent.apply(this, arguments);
            this.box2dWorld = box2dWorld;
            this.userId = userId;
            this.positionX = positionY;
            this.positionY = positionY;
            this.displayName = displayName;
    
            this.iconImage = new Image();
            this.iconImage.src = 'images/pages/test/avatar.png';
        }

        shared.view.component.ThemeIcon.prototype = new shared.view.component.UIComponent;
        shared.view.component.ThemeIcon.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.ThemeIcon.prototype.constructor = shared.view.component.ThemeIcon;

        shared.view.component.ThemeIcon.prototype.destroy = function()
        {
            if (this.themeIconJoint)
            {
                console.log("destroying themeIcon joint");
                this.box2dWorld.DestroyJoint(this.themeIconJoint);
                this.themeIconJoint = null;
            }
    
            if (this.themeIcon)
            {
                console.log("destroying themeIcon");
                this.box2dWorld.DestroyBody(this.themeIcon);
                this.themeIcon = null;
            }
    
            if (this.themeIconAnchor)
            {
                console.log("destroying themeIcon anchor");
                this.box2dWorld.DestroyBody(this.themeIconAnchor);
                this.themeIconAnchor = null;
            }
        }

        shared.view.component.ThemeIcon.prototype.create = function()
        {
            var themeIconAnchorDef = new b2BodyDef;
            themeIconAnchorDef.type = b2Body.b2_staticBody;
            themeIconAnchorDef.position.Set(8, 0);
            themeIconAnchorDef.userData = 'themeIconAnchor';
    
            var themeIconDef = new b2BodyDef;
            themeIconDef.type = b2Body.b2_dynamicBody;
            themeIconDef.position.Set(0, -10);
            themeIconDef.userData = 'themeIcon';
            themeIconDef.linearDamping = 2;
    
            var themeIconFixDef = new b2FixtureDef;
            themeIconFixDef.density = 0;
            themeIconFixDef.friction = 0;
            themeIconFixDef.restitution = 0;
            themeIconFixDef.shape = new b2PolygonShape;
            themeIconFixDef.shape.SetAsBox(4.9, 1.5);
            themeIconFixDef.isSensor = true;
    
            var themeIconAnchorFixDef = new b2FixtureDef;
            themeIconAnchorFixDef.density = 0;
            themeIconAnchorFixDef.friction = 0 ;
            themeIconAnchorFixDef.restitution = 0;
            themeIconAnchorFixDef.shape = new b2PolygonShape;
            themeIconAnchorFixDef.shape.SetAsBox(2, 1);
            themeIconAnchorFixDef.isSensor = true;
    
            this.themeIcon = this.box2dWorld.CreateBody(themeIconDef);
            this.themeIconAnchor = this.box2dWorld.CreateBody(themeIconAnchorDef);
    
            this.themeIcon.CreateFixture(themeIconFixDef);
            this.themeIconAnchor.CreateFixture(themeIconAnchorFixDef);
    
            var themeIconJointDef = new b2DistanceJointDef();
            themeIconJointDef.bodyA = this.themeIcon;
            themeIconJointDef.bodyB = this.themeIconAnchor;
            themeIconJointDef.localAnchorA = new b2Vec2(0,0);
            themeIconJointDef.localAnchorB = new b2Vec2(0,2);
    
            this.themeIconJoint = this.box2dWorld.CreateJoint(themeIconJointDef);
    
        }

        shared.view.component.ThemeIcon.prototype.drawThemeIcon = function(context)
        {
            context.drawImage(this.iconImage, -160, -165);
    
            context.font = 'bold 25px sans-serif';
            context.fillStyle = 'FFFFFF';
            context.fillText(this.displayName, -50, 7);
        }

        shared.view.component.ThemeIcon.prototype.update = function(context)
        {
            // TODO: (WK) Move this into some base class.
            var pos = this.themeIcon.GetPosition();
            context.translate(pos.x * shared.view.component.Canvas.SCALE, pos.y * shared.view.component.Canvas.SCALE);
            context.rotate(this.themeIcon.GetAngle());
        
            this.drawThemeIcon(context);
        }
        
    }
});