includeJS("js/ces/view/component/CESProgramTileDef.js");

CESProgramTile.prototype = new UIComponent;
CESProgramTile.constructor = CESProgramTile;

CESProgramTile.MAIN_IMAGE_SMALL_WIDTH = 167;
CESProgramTile.MAIN_IMAGE_SMALL_HEIGHT = 98;
CESProgramTile.MAIN_IMAGE_SMALL_X = -84;
CESProgramTile.MAIN_IMAGE_SMALL_Y = -70;
CESProgramTile.BACKGROUND_IMAGE_SMALL_X = -105;
CESProgramTile.BACKGROUND_IMAGE_SMALL_Y = -84;
CESProgramTile.MAX_TEXT_LENGTH_SMALL = 17;

CESProgramTile.MAIN_IMAGE_MEDIUM_WIDTH = 205;
CESProgramTile.MAIN_IMAGE_MEDIUM_HEIGHT = 130;
CESProgramTile.MAIN_IMAGE_MEDIUM_X = -100;
CESProgramTile.MAIN_IMAGE_MEDIUM_Y = -85;
CESProgramTile.BACKGROUND_IMAGE_MEDIUM_X = -122;
CESProgramTile.BACKGROUND_IMAGE_MEDIUM_Y = -95;
CESProgramTile.MAX_TEXT_LENGTH_MEDIUM = 21;

CESProgramTile.MAIN_IMAGE_LARGE_WIDTH = 286;
CESProgramTile.MAIN_IMAGE_LARGE_HEIGHT = 183;
CESProgramTile.MAIN_IMAGE_LARGE_X = -140;
CESProgramTile.MAIN_IMAGE_LARGE_Y = -110;
CESProgramTile.BACKGROUND_IMAGE_LARGE_X = -165;
CESProgramTile.BACKGROUND_IMAGE_LARGE_Y = -140;
CESProgramTile.MAX_TEXT_LENGTH_LARGE = 30;

CESProgramTile.prototype.box = null;

function CESProgramTile(box2dWorld, programTileDef)
{
    UIComponent.apply(this, null);
    this.box2dWorld = box2dWorld;

    this.positionX = programTileDef.positionX;
    this.positionY = programTileDef.positionY;
    this.weightingSize = programTileDef.weightingSize;
    this.programId = programTileDef.programId;
    this.programTitle = programTileDef.programTitle;
    this.programDisplayTitle = this.formatDisplayName(programTileDef.programTitle, programTileDef.weightingSize);
    this.programType = programTileDef.programType;
    this.videoURI = programTileDef.videoURI;
    
    this.imageSrc = programTileDef.programImageSrc;

    this.imageLoaded = false;
    this.image = new Image();
    
    var programTile = this;
    this.image.onload = function() 
    {
        programTile.imageLoaded = true;
    };
    
    this.image.src = programTileDef.programImageSrc;
    
    this.backgroundImage = new Image();
    if (this.weightingSize == CESProgramTileDef.WEIGHTING_SIZE_LARGE)
    {
        this.backgroundImage.src = 'images/pages/ces/lrgBoxBg.png';
    }
    else if (this.weightingSize == CESProgramTileDef.WEIGHTING_SIZE_MEDIUM)
    {
        this.backgroundImage.src = 'images/pages/ces/medBoxBg.png';
    }
    else if (this.weightingSize == CESProgramTileDef.WEIGHTING_SIZE_SMALL)
    {
        this.backgroundImage.src = 'images/pages/ces/smBoxBg.png';
    }
}

CESProgramTile.prototype.getBodyPosition = function()
{
    return (this.box) ? this.box.GetPosition() : null;
}

CESProgramTile.prototype.formatDisplayName = function(programTitle, weightingSize)
{
    var maxTextLength;
    if (weightingSize == CESProgramTileDef.WEIGHTING_SIZE_LARGE)
    {
        maxTextLength = CESProgramTile.MAX_TEXT_LENGTH_LARGE;
    }
    else if (weightingSize == CESProgramTileDef.WEIGHTING_SIZE_MEDIUM)
    {
        maxTextLength = CESProgramTile.MAX_TEXT_LENGTH_MEDIUM;
    }
    else if (weightingSize == CESProgramTileDef.WEIGHTING_SIZE_SMALL)
    {
        maxTextLength = CESProgramTile.MAX_TEXT_LENGTH_SMALL;
    }
    
    if (programTitle.length > maxTextLength)
    {
        return programTitle.substring(0, maxTextLength) + "...";
    }
    else
    {
        return programTitle;
    }
}

CESProgramTile.prototype.toString = function()
{
    return "CESProgramTile: ID = " + this.programId + ", TYPE = " + this.programType + ", TITLE = " + this.programTitle;
}

CESProgramTile.prototype.create = function()
{
    var boxDef = new b2BodyDef;
    boxDef.type = b2Body.b2_dynamicBody;
    boxDef.position.x = this.positionX;
    boxDef.position.y = this.positionY;
    //boxDef.fixedRotation = true;
    boxDef.userData = this.programId;
    
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = Box2DConstants.PROGRAM_TILE_DENSITY;
    fixtureDef.friction = Box2DConstants.PROGRAM_TILE_FRICTION;
    fixtureDef.restitution = Box2DConstants.PROGRAM_TILE_RESTITUTION;
    fixtureDef.shape = new b2PolygonShape;
    
    switch (this.weightingSize)
    {
        case CESProgramTileDef.WEIGHTING_SIZE_LARGE:
            fixtureDef.shape.SetAsBox(5,3.9);
            break;
        case CESProgramTileDef.WEIGHTING_SIZE_MEDIUM:
            fixtureDef.shape.SetAsBox(3.6,2.8);
            break;
        case CESProgramTileDef.WEIGHTING_SIZE_SMALL:
            fixtureDef.shape.SetAsBox(3.0,2.3);
            break;
    }
    
    this.box = this.box2dWorld.CreateBody(boxDef);
    this.box.CreateFixture(fixtureDef);
    
    return this.box;
}

CESProgramTile.prototype.drawLrgText = function(context)
{
    context.font = 'bold 16px sans-serif';
    context.fillStyle = '000000';
    context.fillText(this.programDisplayTitle, -140, 100);
}

CESProgramTile.prototype.drawMedText = function(context)
{
    context.font = 'bold 16px sans-serif';
    context.fillStyle = '000000';
    context.fillText(this.programDisplayTitle, -100, 65);
}

CESProgramTile.prototype.drawSmText = function(context)
{
    context.font = 'bold 16px sans-serif';
    context.fillStyle = '000000';
    context.fillText(this.programDisplayTitle, -85, 55);
}

CESProgramTile.prototype.drawBox = function (context, 
                                            backgroundImageX, 
                                            backgroundImageY, 
                                            mainImageX, 
                                            mainImageY, 
                                            mainImageWidth, 
                                            mainImageHeight)
{
    context.drawImage(this.backgroundImage, backgroundImageX, backgroundImageY);
    
    if (this.imageLoaded)
    {
        try
        {
            context.drawImage(this.image, mainImageX, mainImageY, mainImageWidth, mainImageHeight);
        } 
        catch (e) 
        {
            console.log("CESProgramTile.prototype.drawBox: Could not draw image: this.imageSrc = " + this.imageSrc + "; error = " + e.message);
        }
    }
}

CESProgramTile.prototype.update = function(context)
{
    // TODO: (WK) Move this into some base class.
    var pos = this.box.GetPosition();
    context.translate(pos.x * Canvas.SCALE, pos.y * Canvas.SCALE);
    context.rotate(this.box.GetAngle());
       
    if (this.weightingSize == CESProgramTileDef.WEIGHTING_SIZE_LARGE)
    {
        this.drawBox(
            context, 
            CESProgramTile.BACKGROUND_IMAGE_LARGE_X, 
            CESProgramTile.BACKGROUND_IMAGE_LARGE_Y, 
            CESProgramTile.MAIN_IMAGE_LARGE_X, 
            CESProgramTile.MAIN_IMAGE_LARGE_Y, 
            CESProgramTile.MAIN_IMAGE_LARGE_WIDTH, 
            CESProgramTile.MAIN_IMAGE_LARGE_HEIGHT);
        this.drawLrgText(context);
    }
    else if (this.weightingSize == CESProgramTileDef.WEIGHTING_SIZE_MEDIUM)
    {
        this.drawBox(
            context, 
            CESProgramTile.BACKGROUND_IMAGE_MEDIUM_X, 
            CESProgramTile.BACKGROUND_IMAGE_MEDIUM_Y, 
            CESProgramTile.MAIN_IMAGE_MEDIUM_X, 
            CESProgramTile.MAIN_IMAGE_MEDIUM_Y, 
            CESProgramTile.MAIN_IMAGE_MEDIUM_WIDTH, 
            CESProgramTile.MAIN_IMAGE_MEDIUM_HEIGHT);
        this.drawMedText(context);
    }
    else if (this.weightingSize == CESProgramTileDef.WEIGHTING_SIZE_SMALL)
    {
        this.drawBox(
            context, 
            CESProgramTile.BACKGROUND_IMAGE_SMALL_X, 
            CESProgramTile.BACKGROUND_IMAGE_SMALL_Y, 
            CESProgramTile.MAIN_IMAGE_SMALL_X, 
            CESProgramTile.MAIN_IMAGE_SMALL_Y, 
            CESProgramTile.MAIN_IMAGE_SMALL_WIDTH, 
            CESProgramTile.MAIN_IMAGE_SMALL_HEIGHT);
        this.drawSmText(context);
    }
}

CESProgramTile.prototype.destroy = function()
{
    if (this.box)
    {
        console.log("destroying box");
        this.box2dWorld.DestroyBody(this.box);
        this.box = null;
    }
}

