jingo.declare(
{
    require: [],
    name: 'ages_0to3.view.component.A03ProgramTileDef',
    as: function() 
    {

        ages_0to3.view.component.A03ProgramTileDef = function(
            programId, 
            programType, 
            programTitle, 
            programImageSrc, 
            fontColor, 
            videoPlayerCtrlImageSrc, 
            videoURI, 
            positionX, 
            positionY)
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
        }
        
        ages_0to3.view.component.A03ProgramTileDef.prototype = {};
        ages_0to3.view.component.A03ProgramTileDef.prototype.parent = Object.prototype;
        ages_0to3.view.component.A03ProgramTileDef.prototype.constructor = ages_0to3.view.component.A03ProgramTileDef;

        ages_0to3.view.component.A03ProgramTileDef.prototype.programId = null;
        ages_0to3.view.component.A03ProgramTileDef.prototype.programTitle = null;
        ages_0to3.view.component.A03ProgramTileDef.prototype.programImageSrc = null;
        ages_0to3.view.component.A03ProgramTileDef.prototype.fontColor = null;
        ages_0to3.view.component.A03ProgramTileDef.prototype.videoPlayerCtrlImageSrc = null;
        ages_0to3.view.component.A03ProgramTileDef.prototype.positionX = 0;
        ages_0to3.view.component.A03ProgramTileDef.prototype.positionY = 0;
        ages_0to3.view.component.A03ProgramTileDef.prototype.weightingSize = ages_0to3.view.component.A03ProgramTileDef.WEIGHTING_SIZE_SMALL;
        
    }
});