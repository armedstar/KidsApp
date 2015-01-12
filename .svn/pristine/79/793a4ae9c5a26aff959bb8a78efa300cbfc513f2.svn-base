jingo.declare(
{
    require: 
    [],
    name: 'shared.model.ResourceProxy',
    as: function() 
    {

        shared.model.ResourceProxy = function()
        {
            puremvc.Proxy.apply(this, [shared.model.ResourceProxy.NAME, new Array()]);
        }

        shared.model.ResourceProxy.prototype = new puremvc.Proxy;
        shared.model.ResourceProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.ResourceProxy.prototype.constructor = shared.model.ResourceProxy;
        
        shared.model.ResourceProxy.NAME = "ResourceProxy";
        
        shared.model.ResourceProxy.DOCS_DIR_PLACEHOLDER = "[DOCUMENTS]";
        
        shared.model.ResourceProxy._initialized = null;
        
        shared.model.ResourceProxy._fileSystem = null;
        shared.model.ResourceProxy._homeDirectory = null;
        
        shared.model.ResourceProxy.prototype.init = function(finishedCallback)
        {
            if (!this._initialized)
            {
                this._initialized = true;
                
                //  NOTE: (WK) FileAPI access fails in Chrome due to security issues, so 
                //             override when not on device.
                if (DEVICE_MODE_ENABLED)
                {
                    var onFSSuccess = Relegate.create(
                        this,
                        function(fileSystem) 
                        {
                            console.log("Found file system: " + fileSystem.name + "; fileSystem.root.fullPath = " + fileSystem.root.fullPath); 
                            this._fileSystem = fileSystem;
                            this._homeDirectory = fileSystem.root.fullPath;
                            finishedCallback();
                        },
                        this);
                    
                    var onFSError = Relegate.create(
                        this,
                        function(fileError) 
                        {
                            var errorMessage = '';

                            switch (fileError.code) 
                            {
                                case FileError.QUOTA_EXCEEDED_ERR:
                                errorMessage = 'QUOTA_EXCEEDED_ERR';
                                break;
                            
                                case FileError.NOT_FOUND_ERR:
                                errorMessage = 'NOT_FOUND_ERR';
                                break;
                            
                                case FileError.SECURITY_ERR:
                                errorMessage = 'SECURITY_ERR';
                                break;
                            
                                case FileError.INVALID_MODIFICATION_ERR:
                                errorMessage = 'INVALID_MODIFICATION_ERR';
                                break;
                            
                                case FileError.INVALID_STATE_ERR:
                                errorMessage = 'INVALID_STATE_ERR';
                                break;
                            
                                default:
                                errorMessage = 'Unknown Error';
                                break;
                            }
                            console.log("Error retrieving file system: " + errorMessage);
                            finishedCallback();
                        },
                        this);
                
                    //request the persistent file system
                    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
                    if (DEVICE_MODE_ENABLED)
                    {
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onFSError);
                    }
                    else
                    {
                        window.requestFileSystem(window.PERSISTENT, 0, onFSSuccess, onFSError);
                    }
                }
                else
                {
                    this._fileSystem = null;
                    this._homeDirectory = NON_DEVICE_RESOURCE_DIR;
                    finishedCallback();
                }
            }
            else
            {
                finishedCallback();
            }
        }
        
        shared.model.ResourceProxy.prototype.resolveResourceURL = function(resourceURL)
        {
            var resolvedURL = resourceURL;
            if (resolvedURL && this._homeDirectory && resolvedURL.startsWith(shared.model.ResourceProxy.DOCS_DIR_PLACEHOLDER))
            {
                resolvedURL = "file://" + this._homeDirectory + resolvedURL.slice(shared.model.ResourceProxy.DOCS_DIR_PLACEHOLDER.length);
            }
            return resolvedURL;
        }
        
    }
});
