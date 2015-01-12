includeJS("js/ces/view/component/CESLoginTile.js");

CESLoginPage.prototype = new BasePage;
CESLoginPage.prototype.parent = BasePage.prototype;
CESLoginPage.prototype.constructor = CESLoginPage;

CESLoginPage.LOGIN_TILE_SELECTED = "loginTileSelected";
CESLoginPage.CLEANUP_FINISHED = "cleanupFinished";

function CESLoginPage(canvas)
{
    BasePage.apply(this, [canvas]);

    this.loginTiles = new Object();
    this.numTiles = 0;
}

CESLoginPage.prototype._doPageEnter = function(data /*arr of User*/)
{
    $('body').css({'background-image' : 'url(images/pages/ces/loginBackground.png)'});
    
    if (WEATHER_ENABLED)
    {
        this.weatherBoxImage = new Image();
        this.weatherBoxImage.src = 'images/pages/ces/clouds.png';
    }
    
    var regUserData = data.pageData;
    if (regUserData)
    {
        var startingX = 9.4;
        var startingY = 12;
        for (var i = 0; i < regUserData.length; i++)
        {
            var u = regUserData[i]; /*User*/
            var tile = new CESLoginTile(
                this.box2dWorld, 
                u.id, 
                u.username,
                u.displayName, 
                u.avatarLoginImageSrc,
                u.avatarTextColor, 
                startingX, 
                startingY);
            var body = tile.create();
            this.loginTiles[body.GetUserData()] = tile;
            this.numTiles++;
            //startingY = startingY - 20;
            startingX = startingX + 15.1;
        }
    }
    this.ground = this.createGround();
}

CESLoginPage.prototype._doPageExit = function()
{
    console.log("CESLoginPage._doPageExit");
    
    if (this.ground)
    {
        this.box2dWorld.DestroyBody(this.ground);
        this.ground = null;
    }
    
    // Destroy tiles
    //  TODO:  (WK) Make this process more efficient.
    for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
    {
        var tile = this.loginTiles[b.GetUserData()];
        if (tile) 
        {
            tile.destroy();
        }
    }
    
    // Destroy remaining bodies
    //  TODO:  (WK) Make this process more efficient to remove need for secondary loop.
    for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
    {
        this.box2dWorld.DestroyBody(b);
    }
    
    this.dispatchEvent(CESLoginPage.CLEANUP_FINISHED);
}

CESLoginPage.prototype._doUpdate = function()
{
    if (WEATHER_ENABLED)
    {
        this.context.save();
        
        this.context.translate(22.5 * Canvas.SCALE, -3.3 * Canvas.SCALE);
        this.context.drawImage(this.weatherBoxImage, 0, 0);
        
        this.context.restore();
    }
    
    for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
    {
        if (b.GetType() == b2Body.b2_kinematicBody) {
            var pos = b.GetPosition();
        
            this.context.save();
        
            var tile = this.loginTiles[b.GetUserData()];
            if (tile)
            {
                tile.update(this.context);
            }
        
            this.context.restore();
            
            /*
            if (pos.y > 50)
            {
                this.loginTiles[b.GetUserData()] = null;
                this.numTiles--;
                this.box2dWorld.DestroyBody(b);
                
                if (this.numTiles <= 0)
                {
                    this.dispatchEvent(CESLoginPage.CLEANUP_FINISHED);
                }
            }*/
        }
    }
    
}

CESLoginPage.prototype.onBodySelected = function(body)
{
    var loginTile = this.loginTiles[body.GetUserData()];
    if (loginTile)
    {
        this.selectedTile = loginTile;
        this.dispatchEvent(CESLoginPage.LOGIN_TILE_SELECTED);
    }
}

CESLoginPage.prototype.createGround = function()
{
    console.log("created ground");
    var groundDef = new b2BodyDef;
    groundDef.type = b2Body.b2_staticBody;
    groundDef.position.Set(0, 24);
    groundDef.userData = 'ground';
    
    var groundFixDef = new b2FixtureDef;
    groundFixDef.density = 1.0;
    groundFixDef.friction = 0;
    groundFixDef.restitution = 0.2;
    groundFixDef.shape = new b2PolygonShape;
    groundFixDef.shape.SetAsBox(35, .5);
    
    var ground = this.box2dWorld.CreateBody(groundDef);
    ground.CreateFixture(groundFixDef);
    return ground;
}

