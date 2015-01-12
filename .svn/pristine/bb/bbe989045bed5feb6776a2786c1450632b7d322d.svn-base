jingo.declare(
{
    require: 
    [
        "ages_7to9.view.component.A79ProgramTileDef",
        "shared.view.component.UIComponent",
        "shared.view.component.Canvas"
    ],
    name: 'ages_7to9.view.component.A79ProgramTile',
    as: function() 
    {

        ages_7to9.view.component.A79ProgramTile = function(box2dWorld, programTileDef)
        {
            shared.view.component.UIComponent.apply(this, null);
            this.box2dWorld = box2dWorld;

            this.positionX = programTileDef.positionX;
            this.positionY = programTileDef.positionY;
            this.programId = programTileDef.programId;
            this.programTitle = programTileDef.programTitle;
            this.programDisplayTitle = this.formatDisplayName(programTileDef.programTitle);
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
            this.backgroundImage.src = 'images/pages/ages_7to9/recommendations/tileBg.png';
        }

        ages_7to9.view.component.A79ProgramTile.prototype = new shared.view.component.UIComponent;
        ages_7to9.view.component.A79ProgramTile.prototype.parent = shared.view.component.UIComponent.prototype;
        ages_7to9.view.component.A79ProgramTile.prototype.constructor = ages_7to9.view.component.A79ProgramTile;

        ages_7to9.view.component.A79ProgramTile.BOUNDING_BOX_PADDING_WIDTH = 8;
        ages_7to9.view.component.A79ProgramTile.BOUNDING_BOX_PADDING_HEIGHT = 16;

        ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_WIDTH = 300;
        ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_HEIGHT = 214;
        ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_X = -(ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_WIDTH / 2);
        ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_Y = -(ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_HEIGHT / 2);
        ages_7to9.view.component.A79ProgramTile.MAX_TEXT_LENGTH = 15;
        ages_7to9.view.component.A79ProgramTile.BOUNDING_BOX_WIDTH = (ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_WIDTH - ages_7to9.view.component.A79ProgramTile.BOUNDING_BOX_PADDING_WIDTH) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_7to9.view.component.A79ProgramTile.BOUNDING_BOX_HEIGHT = (ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_HEIGHT - ages_7to9.view.component.A79ProgramTile.BOUNDING_BOX_PADDING_HEIGHT) / (2.0 * shared.view.component.Canvas.SCALE);
        ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_WIDTH = 279;
        ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_HEIGHT = 163;
        ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_X = -(ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_WIDTH / 2);
        ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_Y = ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_Y + 10;
        ages_7to9.view.component.A79ProgramTile.TEXT_X = ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_X + 13;
        ages_7to9.view.component.A79ProgramTile.TEXT_Y = -(ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_Y) - 12;

        ages_7to9.view.component.A79ProgramTile.PROGRAM_TILE_DENSITY = 0;
        ages_7to9.view.component.A79ProgramTile.PROGRAM_TILE_FRICTION = 0;
        ages_7to9.view.component.A79ProgramTile.PROGRAM_TILE_RESTITUTION = 0;
        
        ages_7to9.view.component.A79ProgramTile.TILE_HEIGHT = ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_HEIGHT;

        ages_7to9.view.component.A79ProgramTile.prototype.box = null;

        ages_7to9.view.component.A79ProgramTile.prototype.getPullBody = function()
        {
            return this.box;
        }

        ages_7to9.view.component.A79ProgramTile.prototype.formatDisplayName = function(programTitle)
        {
            if (programTitle.length > ages_7to9.view.component.A79ProgramTile.MAX_TEXT_LENGTH)
            {
                return programTitle.substring(0, ages_7to9.view.component.A79ProgramTile.MAX_TEXT_LENGTH) + "...";
            }
            else
            {
                return programTitle;
            }
        }

        ages_7to9.view.component.A79ProgramTile.prototype.toString = function()
        {
            return "ages_7to9.view.component.A79ProgramTile: ID = " + this.programId + ", TYPE = " + this.programType + ", TITLE = " + this.programTitle;
        }

        ages_7to9.view.component.A79ProgramTile.prototype.create = function()
        {
            //console.log("ages_7to9.view.component.A79ProgramTile.prototype.create: [START] this.imageSrc = " + this.imageSrc);
            var boxDef = new b2BodyDef;
            boxDef.type = b2Body.b2_kinematicBody;
            boxDef.position.x = this.positionX;
            boxDef.position.y = this.positionY;
            boxDef.fixedRotation = true;
            boxDef.userData = this.programId;
            boxDef.linearDamping = 2;
    
            var fixtureDef = new b2FixtureDef;
            fixtureDef.density = ages_7to9.view.component.A79ProgramTile.PROGRAM_TILE_DENSITY;
            fixtureDef.friction = ages_7to9.view.component.A79ProgramTile.PROGRAM_TILE_FRICTION;
            fixtureDef.restitution = ages_7to9.view.component.A79ProgramTile.PROGRAM_TILE_RESTITUTION;
            fixtureDef.shape = new b2PolygonShape;
            fixtureDef.shape.SetAsBox(
                        ages_7to9.view.component.A79ProgramTile.BOUNDING_BOX_WIDTH, 
                        ages_7to9.view.component.A79ProgramTile.BOUNDING_BOX_HEIGHT);
    
            this.box = this.box2dWorld.CreateBody(boxDef);
            this.box.CreateFixture(fixtureDef);
    
            //console.log("ages_7to9.view.component.A79ProgramTile.prototype.create: [END] this.imageSrc = " + this.imageSrc);
    
            return this.box;
        }

        ages_7to9.view.component.A79ProgramTile.prototype.drawText = function(context)
        {
            context.font = '20pt museo-slab900';
            context.fillStyle = this.fontColor;
            context.fillText(
                this.programDisplayTitle, 
                ages_7to9.view.component.A79ProgramTile.TEXT_X, 
                ages_7to9.view.component.A79ProgramTile.TEXT_Y);
        }

        ages_7to9.view.component.A79ProgramTile.prototype.drawBox = function (context, 
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
                    console.log("ages_7to9.view.component.A79ProgramTile.prototype.drawBox: Could not draw image: this.imageSrc = " + this.imageSrc + "; error = " + e.message);
                }
            }
        }

        ages_7to9.view.component.A79ProgramTile.prototype.update = function(context)
        {
            // TODO: (WK) Move this into some base class.
            var pos = this.box.GetPosition();
            context.translate(pos.x * shared.view.component.Canvas.SCALE, pos.y * shared.view.component.Canvas.SCALE);
            context.rotate(this.box.GetAngle());
            
            this.drawBox(
                    context, 
                    ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_X, 
                    ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_Y, 
                    ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_WIDTH,
                    ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_HEIGHT,
                    ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_X, 
                    ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_Y, 
                    ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_WIDTH, 
                    ages_7to9.view.component.A79ProgramTile.MAIN_IMAGE_HEIGHT);
              
            this.drawText(context);
        }

        ages_7to9.view.component.A79ProgramTile.prototype.destroy = function()
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

