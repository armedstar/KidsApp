jingo.declare(
{
    require: 
    [
        "ages_3to6.view.component.A36ThemeTileDef",
        "shared.view.component.UIComponent",
        "shared.view.component.Canvas"
    ],
    name: 'ages_3to6.view.component.A36ThemeTile',
    as: function() 
    {

        ages_3to6.view.component.A36ThemeTile = function(box2dWorld, themeTileDef)
        {
            shared.view.component.UIComponent.apply(this, null);
            this.box2dWorld = box2dWorld;

            this.positionX = themeTileDef.positionX;
            this.positionY = themeTileDef.positionY;
            this.themeId = themeTileDef.themeId;
    
            this.imageSrc = themeTileDef.selectionIconImageSrc;

            this.imageLoaded = false;
            this.image = new Image();
    
            var themeTile = this;
            this.image.onload = function() 
            {
                themeTile.imageLoaded = true;
            };
    
            this.image.src = themeTileDef.selectionIconImageSrc;
    
            this.backgroundImage = new Image();
            this.backgroundImage.src = 'images/pages/ages_3to6/themeSelection/tileBg.png';
        }

        ages_3to6.view.component.A36ThemeTile.prototype = new shared.view.component.UIComponent;
        ages_3to6.view.component.A36ThemeTile.prototype.parent = shared.view.component.UIComponent.prototype;
        ages_3to6.view.component.A36ThemeTile.prototype.constructor = ages_3to6.view.component.A36ThemeTile;

        ages_3to6.view.component.A36ThemeTile.BOUNDING_BOX_PADDING_WIDTH = 0;
        ages_3to6.view.component.A36ThemeTile.BOUNDING_BOX_PADDING_HEIGHT = 0;

        ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_WIDTH = 436;
        ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_HEIGHT = 312;
        ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_X = -(ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_WIDTH / 2);
        ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_Y = -(ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_HEIGHT / 2);
        ages_3to6.view.component.A36ThemeTile.BOUNDING_BOX_WIDTH = (ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_WIDTH + ages_3to6.view.component.A36ThemeTile.BOUNDING_BOX_PADDING_WIDTH) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_3to6.view.component.A36ThemeTile.BOUNDING_BOX_HEIGHT = (ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_HEIGHT + ages_3to6.view.component.A36ThemeTile.BOUNDING_BOX_PADDING_HEIGHT) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_WIDTH = 400;
        ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_HEIGHT = 280;
        ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_X = -(ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_WIDTH / 2);
        ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_Y = -(ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_HEIGHT / 2);
        
        ages_3to6.view.component.A36ThemeTile.prototype.box = null;

        ages_3to6.view.component.A36ThemeTile.prototype.getBodyPosition = function()
        {
            return (this.box) ? this.box.GetPosition() : null;
        }

        ages_3to6.view.component.A36ThemeTile.prototype.toString = function()
        {
            return "ages_3to6.view.component.A36ThemeTile: ID = " + this.themeId;
        }

        ages_3to6.view.component.A36ThemeTile.prototype.create = function()
        {
            var boxDef = new b2BodyDef;
            boxDef.type = b2Body.b2_kinematicBody;
            boxDef.position.x = this.positionX;
            boxDef.position.y = this.positionY;
            boxDef.fixedRotation = true;
            boxDef.userData = this.themeId;
    
            var fixtureDef = new b2FixtureDef;
            fixtureDef.density = Box2DConstants.PROGRAM_TILE_DENSITY;
            fixtureDef.friction = Box2DConstants.PROGRAM_TILE_FRICTION;
            fixtureDef.restitution = Box2DConstants.PROGRAM_TILE_RESTITUTION;
            fixtureDef.shape = new b2PolygonShape;
            
            fixtureDef.shape.SetAsBox(
                        ages_3to6.view.component.A36ThemeTile.BOUNDING_BOX_WIDTH, 
                        ages_3to6.view.component.A36ThemeTile.BOUNDING_BOX_HEIGHT);
              
            this.box = this.box2dWorld.CreateBody(boxDef);
            this.box.CreateFixture(fixtureDef);
    
            return this.box;
        }

        ages_3to6.view.component.A36ThemeTile.prototype.drawBox = function (context, 
                                                    backgroundImageX, 
                                                    backgroundImageY, 
                                                    backgroundImageWidth, 
                                                    backgroundImageHeight, 
                                                    mainImageX, 
                                                    mainImageY, 
                                                    mainImageWidth, 
                                                    mainImageHeight)
        {
            context.drawImage(this.backgroundImage, backgroundImageX, backgroundImageY, backgroundImageWidth, backgroundImageHeight);
    
            if (this.imageLoaded)
            {
                try
                {
                    context.drawImage(this.image, mainImageX, mainImageY, mainImageWidth, mainImageHeight);
                } 
                catch (e) 
                {
                    console.log("ages_3to6.view.component.A36ThemeTile.prototype.drawBox: Could not draw image: this.imageSrc = " + this.imageSrc + "; error = " + e.message);
                }
            }
        }

        ages_3to6.view.component.A36ThemeTile.prototype.update = function(context)
        {
            // TODO: (WK) Move this into some base class.
            var pos = this.box.GetPosition();
            context.translate(pos.x * shared.view.component.Canvas.SCALE, pos.y * shared.view.component.Canvas.SCALE);
            context.rotate(this.box.GetAngle());
            
            this.drawBox(
                    context, 
                    ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_X, 
                    ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_Y, 
                    ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_WIDTH,
                    ages_3to6.view.component.A36ThemeTile.BACKGROUND_IMAGE_HEIGHT,
                    ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_X, 
                    ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_Y, 
                    ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_WIDTH, 
                    ages_3to6.view.component.A36ThemeTile.MAIN_IMAGE_HEIGHT);
        }

        ages_3to6.view.component.A36ThemeTile.prototype.destroy = function()
        {
            if (this.box)
            {
                console.log("destroying box");
                this.box2dWorld.DestroyBody(this.box);
                this.box = null;
            }
        }
        
    }
});

