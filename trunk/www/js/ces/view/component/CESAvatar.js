CESAvatar.prototype = new UIComponent;
CESAvatar.constructor = CESAvatar;

function CESAvatar(box2dWorld, userId, positionX, positionY, displayName, frameImageSrc, imageSrc, textColor)
{
    UIComponent.apply(this, arguments);
    this.box2dWorld = box2dWorld;
    this.userId = userId;
    this.positionX = positionY;
    this.positionY = positionY;
    this.displayName = displayName;
    
    this.frameImage = new Image();
    this.frameImage.src = frameImageSrc;
    //this.frameImage.src = 'images/pages/ces/avatar.png';
    
    this.textColor = textColor;
    
    //this.image = new Image();
    //this.image.src = imageSrc;
}

CESAvatar.prototype.destroy = function()
{
    if (this.avatarJoint)
    {
        console.log("destroying avatar joint");
        this.box2dWorld.DestroyJoint(this.avatarJoint);
        this.avatarJoint = null;
    }
    
    if (this.avatar)
    {
        console.log("destroying avatar");
        this.box2dWorld.DestroyBody(this.avatar);
        this.avatar = null;
    }
    
    if (this.avatarAnchor)
    {
        console.log("destroying avatar anchor");
        this.box2dWorld.DestroyBody(this.avatarAnchor);
        this.avatarAnchor = null;
    }
}

CESAvatar.prototype.create = function()
{
    var avatarAnchorDef = new b2BodyDef;
    avatarAnchorDef.type = b2Body.b2_staticBody;
    avatarAnchorDef.position.Set(4, 0);
    avatarAnchorDef.userData = 'myCESAvatarAnchor';
    
    var avatarDef = new b2BodyDef;
    avatarDef.type = b2Body.b2_dynamicBody;
    avatarDef.position.Set(0, -10);
    avatarDef.userData = 'myCESAvatar';
    avatarDef.linearDamping = 2;
    
    var avatarFixDef = new b2FixtureDef;
    avatarFixDef.density = 0;
    avatarFixDef.friction = 0;
    avatarFixDef.restitution = 0;
    avatarFixDef.shape = new b2PolygonShape;
    avatarFixDef.shape.SetAsBox(2.7, 3.4);
    avatarFixDef.isSensor = true;
    
    var avatarAnchorFixDef = new b2FixtureDef;
    avatarAnchorFixDef.density = 0;
    avatarAnchorFixDef.friction = 0 ;
    avatarAnchorFixDef.restitution = 0;
    avatarAnchorFixDef.shape = new b2PolygonShape;
    avatarAnchorFixDef.shape.SetAsBox(2, 1);
    avatarAnchorFixDef.isSensor = true;
    
    this.avatar = this.box2dWorld.CreateBody(avatarDef);
    this.avatarAnchor = this.box2dWorld.CreateBody(avatarAnchorDef);
    
    this.avatar.CreateFixture(avatarFixDef);
    this.avatarAnchor.CreateFixture(avatarAnchorFixDef);
    
    var avatarJointDef = new b2DistanceJointDef();
    avatarJointDef.bodyA = this.avatar;
    avatarJointDef.bodyB = this.avatarAnchor;
    avatarJointDef.localAnchorA = new b2Vec2(0,0);
    avatarJointDef.localAnchorB = new b2Vec2(0,3.45);
    
    this.avatarJoint = this.box2dWorld.CreateJoint(avatarJointDef);
    
}

CESAvatar.prototype.drawAvatar = function(context)
{
    //context.drawImage(this.image, -120, -110);
    context.drawImage(this.frameImage, -158, -109.5);
    
    context.font = 'bold 25px sans-serif';
    context.fillStyle = this.textColor;
    context.fillText(this.displayName, -43, 85);
}

CESAvatar.prototype.update = function(context)
{
    // TODO: (WK) Move this into some base class.
    var pos = this.avatar.GetPosition();
    context.translate(pos.x * Canvas.SCALE, pos.y * Canvas.SCALE);
    context.rotate(this.avatar.GetAngle());
        
    this.drawAvatar(context);
}