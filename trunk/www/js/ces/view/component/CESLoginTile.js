CESLoginTile.prototype = new UIComponent;

CESLoginTile.prototype.box = null;

function CESLoginTile(box2dWorld, id, username, displayName, imageSrc, textColor, positionX, positionY)
{
    UIComponent.apply(this, null);
    this.box2dWorld = box2dWorld;
    
    this.positionX = positionX;
    this.positionY = positionY;
    
    this.id = id;
    this.username = username;
    this.displayName = displayName;
    this.textColor = textColor;
    
    this.loginBoxImage = new Image();
    this.loginBoxImage.src = imageSrc;
    
}

CESLoginTile.prototype.create = function()
{
    var boxDef = new b2BodyDef;
    boxDef.type = b2Body.b2_kinematicBody;
    boxDef.position.x = this.positionX;
    boxDef.position.y = this.positionY;
    boxDef.userData = this.id;
    
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.2;
    fixtureDef.shape = new b2PolygonShape;
    fixtureDef.shape.SetAsBox(7,10);
    
    this.box = this.box2dWorld.CreateBody(boxDef);
    
    this.box.CreateFixture(fixtureDef);
    
    return this.box;
}

CESLoginTile.prototype.drawBox = function(context)
{
    //context.drawImage(this.loginBoxImage, -316, -219, 632, 438);
    context.drawImage(this.loginBoxImage, -220, -333.5, 455, 667);
}

CESLoginTile.prototype.drawUserName = function(context)
{
    context.font = 'bold 60px sans-serif';
    context.fillStyle = this.textColor;
    context.fillText(this.displayName, -87, 240);
}

CESLoginTile.prototype.update = function(context)
{
    // TODO: (WK) Move this into some base class.
    var pos = this.box.GetPosition();
    context.translate(pos.x * Canvas.SCALE, pos.y * Canvas.SCALE);
    context.rotate(this.box.GetAngle());
        
    this.drawBox(context);
    this.drawUserName(context);
}

CESLoginTile.prototype.destroy = function()
{
    if (this.box)
    {
        console.log("destroying box");
        this.box2dWorld.DestroyBody(this.box);
        this.box = null;
    }
    
    //console.log("OAProgramTile.prototype.destroy: [END] this.imageSrc = " + this.imageSrc);
}
