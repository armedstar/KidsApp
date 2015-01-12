jingo.declare(
{
    require: [],
    name: 'shared.model.ProgramBrief',
    as: function() 
    {

        shared.model.ProgramBrief = function(
            id, 
            title, 
            type, 
            imageSrc, 
            mediumImageSrc, 
            smallImageSrc, 
            videoPlayerCtrlImageSrc, 
            videoURI, 
            parentProgram,
            seriesTitle)
        {
            this.id = id;
            this.title = title;
            this.type = type;
            this.imageSrc = imageSrc;   // NOTE:  Represents the large version (i.e. primary) for the image.
            this.mediumImageSrc = mediumImageSrc;
            this.smallImageSrc = smallImageSrc;
            this.videoPlayerCtrlImageSrc = videoPlayerCtrlImageSrc;
            this.videoURI = videoURI;
            this.parentProgram = parentProgram;
            this.seriesTitle = seriesTitle;
        }
        
        shared.model.ProgramBrief.prototype = {};
        shared.model.ProgramBrief.prototype.parent = Object.prototype;
        shared.model.ProgramBrief.prototype.constructor = shared.model.ProgramBrief;

        shared.model.ProgramBrief.MOVIE = "movie";
        shared.model.ProgramBrief.TVSERIES = "tvSeries";
        shared.model.ProgramBrief.TVEPISODE = "tvEpisode";

        shared.model.ProgramBrief.prototype.toString = function()
        {
            return JSON.stringify(this);
        }
        
    }
});