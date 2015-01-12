jingo.declare(
{
    require:
    [
        "shared.view.component.UIComponent"
    ],
    name: 'shared.view.component.Nameplate',
    as: function()
    {
              
        shared.view.component.Nameplate = function(divElem, hasLogout)
        {
            shared.view.component.UIComponent.apply(this, arguments);
            this.avatarArea = document.getElementById('namePlate_nameplateIcon');
            this.titleArea = document.getElementById('namePlate_title');
            this.logoutDrawer = document.getElementById('namePlate_logoutDrawer');
            this.closeButtonArea = document.getElementById('namePlate_closeButton');
            this.collapsed = true;
            if (hasLogout && this.logoutDrawer)
            {
                this.logoutDrawer.addEventListener("touchstart", Relegate.create(this, this.onLogoutDrawerTouch), false);
                this.logoutDrawer.addEventListener("mousedown", Relegate.create(this, this.onLogoutDrawerTouch), false);
            }
            if (this.closeButtonArea)
            {
                this.closeButtonArea.addEventListener("touchstart", Relegate.create(this, this.onCloseButtonTouch), false);
                this.closeButtonArea.addEventListener("mousedown", Relegate.create(this, this.onCloseButtonTouch), false);
            }
        }

        shared.view.component.Nameplate.prototype = new shared.view.component.UIComponent;
        shared.view.component.Nameplate.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.Nameplate.prototype.constructor = shared.view.component.Nameplate;

        shared.view.component.Nameplate.LOGOUT_CLICKED = "logoutClicked";

        shared.view.component.Nameplate.prototype.setIcon = function(imgSrc)
        {
            $(this.avatarArea).html('<img src="' + imgSrc + '" />');
        }
              
        shared.view.component.Nameplate.prototype.setTitle = function(title, color)
        {
            $(this.titleArea).html(title);
            if (color)
            {
                $(this.titleArea).css('color', color);
            }
        }
              
        shared.view.component.Nameplate.prototype.setCloseIcon = function(imgSrc)
        {
            $(this.closeButtonArea).html('<img src="' + imgSrc + '" />');
        }
        
        shared.view.component.Nameplate.prototype.showCloseButton = function(show)
        {
            if (show)
            {
                $(this.closeButtonArea).show();
            }
            else
            {
                $(this.closeButtonArea).hide();
            }
        }
              
        shared.view.component.Nameplate.prototype.onCloseButtonTouch = function(event)
        {
            this.dispatchEvent(shared.view.component.Nameplate.LOGOUT_CLICKED);
        }

        shared.view.component.Nameplate.prototype.showLogoutDrawer = function(show)
        {
            if (show)
            {
                $(this.logoutDrawer).show();
            }
            else
            {
                $(this.logoutDrawer).hide();
            }
        }
              
        shared.view.component.Nameplate.prototype.onLogoutDrawerTouch = function(event)
        {
            if (this.collapsed)
            {
                this.logoutDrawer.style.left = '-4px';
                this.collapsed = false;
            }
            else 
            {
                var x = event.pageX;
                var y = event.pageY;

                if (x <= 100) 
                {
                    this.dispatchEvent(shared.view.component.Nameplate.LOGOUT_CLICKED);
                }
                this.logoutDrawer.style.left =  '-110px';
                this.collapsed = true;
            }
        }

        shared.view.component.Nameplate.prototype.showBackground = function(show)
        {
            $(this.divElem).css('backgroundImage', (show) ? 'url(images/pages/shared/headerBg.png)' : 'url()');
        }
              
    }
});