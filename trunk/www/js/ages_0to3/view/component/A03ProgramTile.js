jingo.declare(
{
    require: 
    [
        "ages_0to3.view.component.A03ProgramTileDef",
        "shared.view.component.UIComponent",
        "shared.view.component.Canvas"
    ],
    name: 'ages_0to3.view.component.A03ProgramTile',
    as: function() 
    {

        ages_0to3.view.component.A03ProgramTile = function(box2dWorld, programTileDef)
        {
            shared.view.component.UIComponent.apply(this, null);
            this.box2dWorld = box2dWorld;

            this.positionX = programTileDef.positionX;
            this.positionY = programTileDef.positionY;
            this.programId = programTileDef.programId;
            this.programTitle = programTileDef.programTitle;
            this.programDisplayTitle = this.formatDisplayName(programTileDef.programTitle, programTileDef.weightingSize);
            this.programType = programTileDef.programType;
            this.videoURI = programTileDef.videoURI;
            this.fontColor = programTileDef.fontColor;
    
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
            this.backgroundImage.src = 'images/pages/ages_0to3/recommendations/tileBg.png';
        }

        ages_0to3.view.component.A03ProgramTile.prototype = new shared.view.component.UIComponent;
        ages_0to3.view.component.A03ProgramTile.prototype.parent = shared.view.component.UIComponent.prototype;
        ages_0to3.view.component.A03ProgramTile.prototype.constructor = ages_0to3.view.component.A03ProgramTile;

        ages_0to3.view.component.A03ProgramTile.BOUNDING_BOX_PADDING_WIDTH = 0;
        ages_0to3.view.component.A03ProgramTile.BOUNDING_BOX_PADDING_HEIGHT = 0;
        
        ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_WIDTH = 436;
        ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_HEIGHT = 312;
        ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_X = -(ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_WIDTH / 2);
        ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_Y = -(ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_HEIGHT / 2);
        ages_0to3.view.component.A03ProgramTile.MAX_TEXT_LENGTH = 25;
        ages_0to3.view.component.A03ProgramTile.BOUNDING_BOX_WIDTH = (ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_WIDTH + ages_0to3.view.component.A03ProgramTile.BOUNDING_BOX_PADDING_WIDTH) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_0to3.view.component.A03ProgramTile.BOUNDING_BOX_HEIGHT = (ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_HEIGHT + ages_0to3.view.component.A03ProgramTile.BOUNDING_BOX_PADDING_HEIGHT) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_WIDTH = 400;
        ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_HEIGHT = 240;
        ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_X = -(ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_WIDTH / 2);
        ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_Y = ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_Y + 15;
        ages_0to3.view.component.A03ProgramTile.TEXT_X = ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_X + 22;
        ages_0to3.view.component.A03ProgramTile.TEXT_Y = -(ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_Y) - 23;
        
        ages_0to3.view.component.A03ProgramTile.prototype.box = null;

        ages_0to3.view.component.A03ProgramTile.prototype.getBodyPosition = function()
        {
            return (this.box) ? this.box.GetPosition() : null;
        }

        ages_0to3.view.component.A03ProgramTile.prototype.formatDisplayName = function(programTitle, weightingSize)
        {
            var maxTextLength = ages_0to3.view.component.A03ProgramTile.MAX_TEXT_LENGTH;
            
            if (programTitle.length > maxTextLength)
            {
                return programTitle.substring(0, maxTextLength) + "...";
            }
            else
            {
                return programTitle;
            }
        }

        ages_0to3.view.component.A03ProgramTile.prototype.toString = function()
        {
            return "ages_0to3.view.component.A03ProgramTile: ID = " + this.programId + ", TYPE = " + this.programType + ", TITLE = " + this.programTitle;
        }

        ages_0to3.view.component.A03ProgramTile.prototype.create = function()
        {
            var boxDef = new b2BodyDef;
            boxDef.type = b2Body.b2_kinematicBody;
            boxDef.position.x = this.positionX;
            boxDef.position.y = this.positionY;
            boxDef.fixedRotation = true;
            boxDef.userData = this.programId;
    
            var fixtureDef = new b2FixtureDef;
            fixtureDef.density = Box2DConstants.PROGRAM_TILE_DENSITY;
            fixtureDef.friction = Box2DConstants.PROGRAM_TILE_FRICTION;
            fixtureDef.restitution = Box2DConstants.PROGRAM_TILE_RESTITUTION;
            fixtureDef.shape = new b2PolygonShape;
            
            fixtureDef.shape.SetAsBox(
                        ages_0to3.view.component.A03ProgramTile.BOUNDING_BOX_WIDTH, 
                        ages_0to3.view.component.A03ProgramTile.BOUNDING_BOX_HEIGHT);
              
            this.box = this.box2dWorld.CreateBody(boxDef);
            this.box.CreateFixture(fixtureDef);
    
            return this.box;
        }

        ages_0to3.view.component.A03ProgramTile.prototype.drawText = function(context)
        {
            context.font = '20pt museo-slab900';
            context.fillStyle = this.fontColor;
            context.fillText(
                this.programDisplayTitle, 
                ages_0to3.view.component.A03ProgramTile.TEXT_X, 
                ages_0to3.view.component.A03ProgramTile.TEXT_Y);
        }

        ages_0to3.view.component.A03ProgramTile.prototype.drawBox = function (context, 
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
                    console.log("ages_0to3.view.component.A03ProgramTile.prototype.drawBox: Could not draw image: this.imageSrc = " + this.imageSrc + "; error = " + e.message);
                }
            }
        }

        ages_0to3.view.component.A03ProgramTile.prototype.update = function(context)
        {
            // TODO: (WK) Move this into some base class.
            var pos = this.box.GetPosition();
            context.translate(pos.x * shared.view.component.Canvas.SCALE, pos.y * shared.view.component.Canvas.SCALE);
            context.rotate(this.box.GetAngle());
            
            this.drawBox(
                    context, 
                    ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_X, 
                    ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_Y, 
                    ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_WIDTH,
                    ages_0to3.view.component.A03ProgramTile.BACKGROUND_IMAGE_HEIGHT,
                    ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_X, 
                    ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_Y, 
                    ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_WIDTH, 
                    ages_0to3.view.component.A03ProgramTile.MAIN_IMAGE_HEIGHT);
              
            this.drawText(context);
            
        }

        ages_0to3.view.component.A03ProgramTile.prototype.destroy = function()
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

