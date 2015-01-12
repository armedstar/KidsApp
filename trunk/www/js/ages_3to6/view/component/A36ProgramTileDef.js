jingo.declare(
{
    require: [],
    name: 'ages_3to6.view.component.A36ProgramTileDef',
    as: function() 
    {

        ages_3to6.view.component.A36ProgramTileDef = function(
            programId, 
            programType, 
            programTitle, 
            programImageSrc, 
            fontColor,
            videoPlayerCtrlImageSrc, 
            videoURI, 
            positionX, 
            positionY, 
            weightingSize)
        {
            this.programId = programId;
            this.programType = programType;
            this.programTitle = programTitle;
            this.programImageSrc = programImageSrc;
            this.fontColor = fontColor;
            this.videoPlayerCtrlImageSrc = videoPlayerCtrlImageSrc;
            this.videoURI = videoURI;
            this.positionX = positionX;
            this.positionY = positionY;
            this.weightingSize = weightingSize;
        }
        
        ages_3to6.view.component.A36ProgramTileDef.prototype = {};
        ages_3to6.view.component.A36ProgramTileDef.prototype.parent = Object.prototype;
        ages_3to6.view.component.A36ProgramTileDef.prototype.constructor = ages_3to6.view.component.A36ProgramTileDef;

        ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM = 0;
        ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL = 1;

        ages_3to6.view.component.A36ProgramTileDef.prototype.programId = null;
        ages_3to6.view.component.A36ProgramTileDef.prototype.programTitle = null;
        ages_3to6.view.component.A36ProgramTileDef.prototype.programImageSrc = null;
        ages_3to6.view.component.A36ProgramTileDef.prototype.programType = null;
        ages_3to6.view.component.A36ProgramTileDef.prototype.fontColor = null;
        ages_3to6.view.component.A36ProgramTileDef.prototype.videoPlayerCtrlImageSrc = null;
        ages_3to6.view.component.A36ProgramTileDef.prototype.parentProgram = null;
        ages_3to6.view.component.A36ProgramTileDef.prototype.positionX = 0;
        ages_3to6.view.component.A36ProgramTileDef.prototype.positionY = 0;
        ages_3to6.view.component.A36ProgramTileDef.prototype.weightingSize = ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL;
        
    }
});