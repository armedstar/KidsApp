CESProgramTileDef.constructor = CESProgramTileDef;

CESProgramTileDef.WEIGHTING_SIZE_LARGE = 0;
CESProgramTileDef.WEIGHTING_SIZE_MEDIUM = 1;
CESProgramTileDef.WEIGHTING_SIZE_SMALL = 2;

CESProgramTileDef.prototype.programId = null;
CESProgramTileDef.prototype.programTitle = null;
CESProgramTileDef.prototype.programImageSrc = null;
CESProgramTileDef.prototype.videoPlayerCtrlImageSrc = null;
CESProgramTileDef.prototype.positionX = 0;
CESProgramTileDef.prototype.positionY = 0;
CESProgramTileDef.prototype.weightingSize = CESProgramTileDef.WEIGHTING_SIZE_SMALL;

function CESProgramTileDef(programId, programType, programTitle, programImageSrc, videoPlayerCtrlImageSrc, videoURI, positionX, positionY, weightingSize)
{
	this.programId = programId;
    this.programType = programType;
	this.programTitle = programTitle;
	this.programImageSrc = programImageSrc;
    this.videoPlayerCtrlImageSrc = videoPlayerCtrlImageSrc;
    this.videoURI = videoURI;
	this.positionX = positionX;
	this.positionY = positionY;
	this.weightingSize = weightingSize;
}