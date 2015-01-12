jingo.declare(
{
    require: [],
    name: 'ages_7to9.view.component.A79ProgramTileDef',
    as: function() 
    {

        ages_7to9.view.component.A79ProgramTileDef = function(
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
        
        ages_7to9.view.component.A79ProgramTileDef.prototype = {};
        ages_7to9.view.component.A79ProgramTileDef.prototype.parent = Object.prototype;
        ages_7to9.view.component.A79ProgramTileDef.prototype.constructor = ages_7to9.view.component.A79ProgramTileDef;

        ages_7to9.view.component.A79ProgramTileDef.prototype.programId = null;
        ages_7to9.view.component.A79ProgramTileDef.prototype.programTitle = null;
        ages_7to9.view.component.A79ProgramTileDef.prototype.programImageSrc = null;
        ages_7to9.view.component.A79ProgramTileDef.prototype.programType = null;
        ages_7to9.view.component.A79ProgramTileDef.prototype.fontColor = null;
        ages_7to9.view.component.A79ProgramTileDef.prototype.videoPlayerCtrlImageSrc = null;
        ages_7to9.view.component.A79ProgramTileDef.prototype.parentProgram = null;
        ages_7to9.view.component.A79ProgramTileDef.prototype.positionX = 0;
        ages_7to9.view.component.A79ProgramTileDef.prototype.positionY = 0;
        
    }
});