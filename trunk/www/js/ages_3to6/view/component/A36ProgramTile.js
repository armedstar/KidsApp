jingo.declare(
{
    require: 
    [
        "ages_3to6.view.component.A36ProgramTileDef",
        "shared.view.component.UIComponent",
        "shared.view.component.Canvas"
    ],
    name: 'ages_3to6.view.component.A36ProgramTile',
    as: function() 
    {

        ages_3to6.view.component.A36ProgramTile = function(box2dWorld, programTileDef)
        {
            shared.view.component.UIComponent.apply(this, null);
            this.box2dWorld = box2dWorld;
              this.programTileDef = programTileDef;

            this.positionX = programTileDef.positionX;
            this.positionY = programTileDef.positionY;
            this.weightingSize = programTileDef.weightingSize;
            this.programId = programTileDef.programId;
            this.programTitle = programTileDef.programTitle;
            this.programDisplayTitle = this.formatDisplayName(programTileDef.programTitle, programTileDef.weightingSize);
            this.programType = programTileDef.programType;
            this.parentProgram = programTileDef.parentProgram;
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
            if (this.weightingSize == ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM)
            {
                //this.backgroundImage.src = 'images/pages/ages_3to6/recommendations/medBoxBg-test-white.png';
                //this.backgroundImage.src = 'images/pages/ages_3to6/recommendations/medBoxBg-test-black.png';
                this.backgroundImage.src = 'images/pages/ages_3to6/recommendations/medProgramTileBg.png';
            }
            else if (this.weightingSize == ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL)
            {
                //this.backgroundImage.src = 'images/pages/ages_3to6/recommendations/smBoxBg-test-white.png';
                //this.backgroundImage.src = 'images/pages/ages_3to6/recommendations/smBoxBg-test-black.png';
                this.backgroundImage.src = 'images/pages/ages_3to6/recommendations/smProgramTileBg.png';
            }
        }

        ages_3to6.view.component.A36ProgramTile.prototype = new shared.view.component.UIComponent;
        ages_3to6.view.component.A36ProgramTile.prototype.parent = shared.view.component.UIComponent.prototype;
        ages_3to6.view.component.A36ProgramTile.prototype.constructor = ages_3to6.view.component.A36ProgramTile;
        
        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_PADDING_WIDTH = 8;
        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_PADDING_HEIGHT = 16;

        ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_WIDTH = 233;
        ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_HEIGHT = 174;
        ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_X = -(ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_WIDTH / 2);
        ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_Y = -(ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_HEIGHT / 2);
        ages_3to6.view.component.A36ProgramTile.MAX_TEXT_LENGTH_SMALL = 18;
        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_SMALL_WIDTH = (ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_WIDTH - ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_PADDING_WIDTH) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_SMALL_HEIGHT = (ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_HEIGHT - ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_PADDING_HEIGHT) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_WIDTH = 190;
        ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_HEIGHT = 111;
        ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_X = -(ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_WIDTH / 2);
        ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_Y = ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_Y + 20;
        ages_3to6.view.component.A36ProgramTile.TEXT_SMALL_X = ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_X + 22;
        ages_3to6.view.component.A36ProgramTile.TEXT_SMALL_Y = -(ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_Y) - 23;
        
        ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_WIDTH = 329;
        ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_HEIGHT = 248;
        ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_X = -(ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_WIDTH / 2);
        ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_Y = -(ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_HEIGHT / 2);
        ages_3to6.view.component.A36ProgramTile.MAX_TEXT_LENGTH_MEDIUM = 15;
        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_MEDIUM_WIDTH = (ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_WIDTH - ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_PADDING_WIDTH) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_MEDIUM_HEIGHT = (ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_HEIGHT - ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_PADDING_HEIGHT) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_WIDTH = 279;
        ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_HEIGHT = 163;
        ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_X = -(ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_WIDTH / 2);
        ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_Y = ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_Y + 27;
        ages_3to6.view.component.A36ProgramTile.TEXT_MEDIUM_X = ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_X + 22;
        ages_3to6.view.component.A36ProgramTile.TEXT_MEDIUM_Y = -(ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_Y) - 27;

        ages_3to6.view.component.A36ProgramTile.prototype.box = null;

        ages_3to6.view.component.A36ProgramTile.prototype.getBodyPosition = function()
        {
            return (this.box) ? this.box.GetPosition() : null;
        }

        ages_3to6.view.component.A36ProgramTile.prototype.formatDisplayName = function(programTitle, weightingSize)
        {
            var maxTextLength;
            if (weightingSize == ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM)
            {
                maxTextLength = ages_3to6.view.component.A36ProgramTile.MAX_TEXT_LENGTH_MEDIUM;
            }
            else if (weightingSize == ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL)
            {
                maxTextLength = ages_3to6.view.component.A36ProgramTile.MAX_TEXT_LENGTH_SMALL;
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

        ages_3to6.view.component.A36ProgramTile.prototype.toString = function()
        {
            return "ages_3to6.view.component.A36ProgramTile: ID = " + this.programId + ", TYPE = " + this.programType + ", TITLE = " + this.programTitle;
        }

        ages_3to6.view.component.A36ProgramTile.prototype.create = function()
        {
            var boxDef = new b2BodyDef;
            boxDef.type = b2Body.b2_dynamicBody;
            boxDef.position.x = this.positionX;
            boxDef.position.y = this.positionY;
            boxDef.fixedRotation = true;
            boxDef.userData = { id: this.programId };
    
            var fixtureDef = new b2FixtureDef;
            fixtureDef.density = Box2DConstants.PROGRAM_TILE_DENSITY;
            fixtureDef.friction = Box2DConstants.PROGRAM_TILE_FRICTION;
            fixtureDef.restitution = Box2DConstants.PROGRAM_TILE_RESTITUTION;
            fixtureDef.shape = new b2PolygonShape;
    
            switch (this.weightingSize)
            {
                case ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM:
                    fixtureDef.shape.SetAsBox(
                        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_MEDIUM_WIDTH, 
                        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_MEDIUM_HEIGHT);
                    break;
                case ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL:
                    fixtureDef.shape.SetAsBox(
                        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_SMALL_WIDTH, 
                        ages_3to6.view.component.A36ProgramTile.BOUNDING_BOX_SMALL_HEIGHT);
                    break;
            }
    
            this.box = this.box2dWorld.CreateBody(boxDef);
            this.box.CreateFixture(fixtureDef);
    
            return this.box;
        }

        ages_3to6.view.component.A36ProgramTile.prototype.drawMedText = function(context)
        {
            context.font = '20pt museo-slab900';
            context.fillStyle = this.fontColor;
            context.fillText(
                this.programDisplayTitle, 
                ages_3to6.view.component.A36ProgramTile.TEXT_MEDIUM_X, 
                ages_3to6.view.component.A36ProgramTile.TEXT_MEDIUM_Y);
        }

        ages_3to6.view.component.A36ProgramTile.prototype.drawSmText = function(context)
        {
            context.font = '13pt museo-slab900';
            context.fillStyle = this.fontColor;
            context.fillText(
                this.programDisplayTitle, 
                ages_3to6.view.component.A36ProgramTile.TEXT_SMALL_X, 
                ages_3to6.view.component.A36ProgramTile.TEXT_SMALL_Y);
        }

        ages_3to6.view.component.A36ProgramTile.prototype.drawBox = function (context, 
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
                    console.log("ages_3to6.view.component.A36ProgramTile.prototype.drawBox: Could not draw image: this.imageSrc = " + this.imageSrc + "; error = " + e.message);
                }
            }
        }

        ages_3to6.view.component.A36ProgramTile.prototype.update = function(context)
        {
            // TODO: (WK) Move this into some base class.
            var pos = this.box.GetPosition();
            context.translate(pos.x * shared.view.component.Canvas.SCALE, pos.y * shared.view.component.Canvas.SCALE);
            context.rotate(this.box.GetAngle());
       
            if (this.weightingSize == ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM)
            {
                this.drawBox(
                    context, 
                    ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_X, 
                    ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_Y, 
                    ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_WIDTH,
                    ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_MEDIUM_HEIGHT,
                    ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_X, 
                    ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_Y, 
                    ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_WIDTH, 
                    ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_MEDIUM_HEIGHT);
                this.drawMedText(context);
            }
            else if (this.weightingSize == ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL)
            {
                this.drawBox(
                    context, 
                    ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_X, 
                    ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_Y, 
                    ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_WIDTH,
                    ages_3to6.view.component.A36ProgramTile.BACKGROUND_IMAGE_SMALL_HEIGHT,
                    ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_X, 
                    ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_Y, 
                    ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_WIDTH, 
                    ages_3to6.view.component.A36ProgramTile.MAIN_IMAGE_SMALL_HEIGHT);
                this.drawSmText(context);
            }
        }

        ages_3to6.view.component.A36ProgramTile.prototype.destroy = function()
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

