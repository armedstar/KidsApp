jingo.declare(
{
    require: 
    [
        "shared.view.component.BasePage",
        "shared.view.component.LoginTile"
    ],
    name: 'shared.view.component.LoginPage',
    as: function() 
    {

        shared.view.component.LoginPage = function(canvas, nameplate)
        {
            shared.view.component.BasePage.apply(this, [canvas]);
            this.nameplate = nameplate;

            this.loginTiles = new Object();
            this.numTiles = 0;
        }

        shared.view.component.LoginPage.prototype = new shared.view.component.BasePage;
        shared.view.component.LoginPage.prototype.parent = shared.view.component.BasePage.prototype;
        shared.view.component.LoginPage.prototype.constructor = shared.view.component.LoginPage;

        shared.view.component.LoginPage.LOGIN_TILE_SELECTED = "loginTileSelected";
        shared.view.component.LoginPage.CLEANUP_FINISHED = "cleanupFinished";

        shared.view.component.LoginPage.prototype._doPageEnter = function(data /*arr of User*/)
        {
            this.nameplate.showLogoutDrawer(false);
            var regUserData = data.pageData;
            this.nameplate.setIcon('images/pages/shared/login/loginAvatar.png');
            this.nameplate.setTitle('LOGIN!', '#666666');
                
            this.setBackgroundImage("images/pages/shared/background.png");
            
            if (regUserData)
            {
                var startingY = 0;
                for (var i = 0; i < regUserData.length; i++)
                {
                    var u = regUserData[i]; /*User*/
                    var tile = new shared.view.component.LoginTile(this.box2dWorld, u.id, u.username, u.displayName, 18, startingY);
                    var body = tile.create();
                    this.loginTiles[body.GetUserData()] = tile;
                    this.numTiles++;
                    startingY = startingY - 20;
                }
            }
            this.ground = this.createGround();
        }

        shared.view.component.LoginPage.prototype._doPageExit = function()
        {
            console.log("shared.view.component.LoginPage._doPageExit");
    
            if (this.ground)
            {
                this.box2dWorld.DestroyBody(this.ground);
                this.ground = null;
            }
        }

        shared.view.component.LoginPage.prototype._doUpdate = function()
        {
            for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
            {
                if (b.GetType() == b2Body.b2_dynamicBody) {
                    var pos = b.GetPosition();
        
                    this.context.save();
        
                    var tile = this.loginTiles[b.GetUserData()];
                    if (tile)
                    {
                        tile.update(this.context);
                    }
        
                    this.context.restore();
            
                    if (pos.y > 50)
                    {
                        this.loginTiles[b.GetUserData()] = null;
                        this.numTiles--;
                        this.box2dWorld.DestroyBody(b);
                
                        if (this.numTiles <= 0)
                        {
                            this.dispatchEvent(shared.view.component.LoginPage.CLEANUP_FINISHED);
                        }
                    }
                }
            }
    
        }

        shared.view.component.LoginPage.prototype.onBodySelected = function(body)
        {
            var loginTile = this.loginTiles[body.GetUserData()];
            if (loginTile)
            {
                this.selectedTile = loginTile;
                this.dispatchEvent(shared.view.component.LoginPage.LOGIN_TILE_SELECTED);
            }
        }

        shared.view.component.LoginPage.prototype.createGround = function()
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
        
    }
});

