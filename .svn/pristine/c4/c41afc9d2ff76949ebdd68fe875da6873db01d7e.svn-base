jingo.declare(
{
    require:
    [
        "shared.view.component.UIComponent"
    ],
    name: 'shared.view.component.ThemePicker',
    as: function()
    {
        shared.view.component.ThemePicker = function(divElem)
        {
            shared.view.component.UIComponent.apply(this, arguments);
            if (this.divElem)
            {
                this.themeIcon = document.getElementById('themePicker_themeIcon');
                
                this.divElem.addEventListener("touchstart", Relegate.create(this, this.onTouched), false);
                this.divElem.addEventListener("mousedown", Relegate.create(this, this.onTouched), false);
            }
        }
        
        shared.view.component.ThemePicker.prototype = new shared.view.component.UIComponent;
        shared.view.component.ThemePicker.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.ThemePicker.prototype.constructor = shared.view.component.ThemePicker;
              
        shared.view.component.ThemePicker.CLICKED = "clicked";

        shared.view.component.ThemePicker.prototype.setIcon = function(imgSrc)
        {
            //  HACK:  Temporary position hack until we can get adjusted images that all fit in the same area.
            if (imgSrc == "images/themes/ages_3to6/default/themeIcon.png")
            {
                $(this.divElem).css('top', "-110px");
                $(this.divElem).css('left', "750px");
            }
            else
            {  
                $(this.divElem).css('top', "-30px");
                $(this.divElem).css('left', "830px");
            }
            
            $(this.themeIcon).html('<img src="' + imgSrc + '" />');
        }
              
        shared.view.component.ThemePicker.prototype.onTouched = function()
        {
            this.dispatchEvent(shared.view.component.ThemePicker.CLICKED);
        }
              
        shared.view.component.ThemePicker.prototype.show = function()
        {
              $(this.divElem).show();
        }
              
        shared.view.component.ThemePicker.prototype.hide = function()
        {
              $(this.divElem).hide();
        }
    }
});