jingo.declare(
{
    require: [],
    name: 'data.Logger',
    as: function() 
    {
        data.Logger = function(logContainer)
        {
            if (logContainer)
            {
                this._logWrapper = document.createElement('ul');
                logContainer.appendChild(this._logWrapper);
            }
        }
        
        data.Logger.prototype = {};
        data.Logger.prototype.parent = Object.prototype;
        data.Logger.prototype.constructor = data.DataLoLoggeradLog;
        
        data.Logger._logWrapper = null;

        data.Logger.prototype.logEvent = function(message)
        {
            if (this._logWrapper)
            {
                console.log(message);
                
                var logItem = document.createElement('li');
                logItem.innerHTML = "<span>" + message + "</span>";
                this._logWrapper.appendChild(logItem);
            }
        }

        data.Logger.prototype.clearLog = function()
        {
            if (this._logWrapper)
            {
                $(this._logWrapper).empty();
            }
        }
        
    }
});
