jingo.declare(
{
    require: 
    [
        "shared.model.User"
    ],
    name: 'shared.controller.GotoInitialScreenCommand',
    as: function() 
    {

        shared.controller.GotoInitialScreenCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.GotoInitialScreenCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.GotoInitialScreenCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.GotoInitialScreenCommand.prototype.constructor = shared.controller.GotoInitialScreenCommand;

        shared.controller.GotoInitialScreenCommand.prototype.execute = function(notification)
        {
            if (DEVICE_MODE_ENABLED)
            {
                window.plugins.ApplicationPreferences.get('family_id', Relegate.create(this, this.getFamilyId, this), function() {alert('Unable to get family id.  Make sure the value is set in the Settings application.');});
              
                window.plugins.ApplicationPreferences.get('notify_watched_vids', Relegate.create(this, this.getNotifyParent), function() {alert('Unable to get notify parents settings.  Make sure the value is set in the Settings application.');});
              
                window.plugins.ApplicationPreferences.get('parental_ctrl_sms', Relegate.create(this, this.getParentalSMS, this), function() {alert('Unable to get parental control SMS number.  Make sure the value is set in the Settings application.');});
            }
            else
            {  
                this.getFamilyId(NON_DEVICE_FAMILY_ID);
            }
        }
              
        shared.controller.GotoInitialScreenCommand.prototype.getNotifyParent = function(notifyParent)
        {
              this.facade.notifyParentOfVideos = notifyParent;
        }
              
        shared.controller.GotoInitialScreenCommand.prototype.getParentalSMS = function(smsNumber)
        {
            this.facade.notifySMS = smsNumber;
        }

        shared.controller.GotoInitialScreenCommand.prototype.getFamilyId = function(famId)
        {
            this.facade.familyId = famId;
    
            if (this.facade.getCurrentUser())
            {
                this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser()});
            }
            else
            {
                this.sendNotification(AppConstants.DISPLAY_LOGIN, {});
            }
        }
        
    }
});