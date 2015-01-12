jingo.declare(
{
    require: [],
    name: 'ages_3to6.view.component.A36ThemeTileDef',
    as: function() 
    {

        ages_3to6.view.component.A36ThemeTileDef = function(themeId, selectionIconImageSrc, positionX, positionY)
        {
            this.themeId = themeId;
            this.selectionIconImageSrc = selectionIconImageSrc;
            this.positionX = positionX;
            this.positionY = positionY;
        }
        
        ages_3to6.view.component.A36ThemeTileDef.prototype = {};
        ages_3to6.view.component.A36ThemeTileDef.prototype.parent = Object.prototype;
        ages_3to6.view.component.A36ThemeTileDef.prototype.constructor = ages_3to6.view.component.A36ThemeTileDef;

        ages_3to6.view.component.A36ThemeTileDef.prototype.themeId = null;
        ages_3to6.view.component.A36ThemeTileDef.prototype.selectionIconImageSrc = null;
        ages_3to6.view.component.A36ThemeTileDef.prototype.positionX = 0;
        ages_3to6.view.component.A36ThemeTileDef.prototype.positionY = 0;
        
    }
});