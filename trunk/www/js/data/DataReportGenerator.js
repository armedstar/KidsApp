jingo.declare(
{
    require: 
    [
        "data.Logger",
        "shared.model.ProgramBrief",
        "shared.model.User"
    ],
    name: "data.DataReportGenerator",
    as: function() 
    {

        data.DataReportGenerator = function(logger)
        {
            this._logger = logger;
            
            this._logEvent("Parse initializing...");
            //Parse.initialize("OVKCeZUq3DaYyWdUx16ZNhtBLUntpdemxzADluaA", "HfWP3tkp3CuRJlIBTMkL7C2cNyNi4HUMnKeh9dLb");  // Playskool
            //Parse.initialize("5kztLw44aLzgoAKTz1adry8I3JXjzxqaBRSWDuIw", "vJVZrgtK4EPd5auc4XjbRngX1Nhi9yTE9IkrOAF3");  // Playskool-Research
            Parse.initialize("WjrJS7OCMGfQwBEDr49ZKr1ERbbgSKhl69PbP9UA", "Xdl6hPeKmzoxWDjM02rSOsSjweGKuv6Flq5UFR84");  // Playskool-Research-B
            //Parse.initialize("0UDyiaboOc49zQEB3YZBnd6aiCTNngHMVTLZzZBP", "nLgbBem5jZj6O74SqvXLL2VH8X9HDGfbT2Y4BX2V");  // Playskool-Sales
            this._logEvent("Parse initialized!");
        }
        
        data.DataReportGenerator.prototype = {};
        data.DataReportGenerator.prototype.parent = Object.prototype;
        data.DataReportGenerator.prototype.constructor = data.DataReportGenerator;
        
        data.DataReportGenerator.prototype._logger = null;
        
        data.DataReportGenerator.prototype._logDebugMessages = false;
        
        data.DataReportGenerator.prototype._savedFamilySet = new Object();
        data.DataReportGenerator.prototype._savedUserSet = new Object();
        data.DataReportGenerator.prototype._savedProgramSet = new Object();
        
        data.DataReportGenerator.prototype.generateReport = function()
        {
            this._clearLog();
            this._logEvent("Processing data for report generation...");
        
            var onGenerateSuccess = Relegate.create(this, this._onGenerateSuccess, this);
            var onGenerateError = Relegate.create(this, this._onGenerateError, this);
            
            var generateReports = Relegate.create(this, this._generateReports, onGenerateSuccess, onGenerateError);
            var obtainTVEpisodeCollection = Relegate.create(this, this._obtainTVEpisodeCollection, generateReports, onGenerateError);
            var obtainTVSeriesCollection = Relegate.create(this, this._obtainTVSeriesCollection, obtainTVEpisodeCollection, onGenerateError);
            var obtainUserCollection = Relegate.create(this, this._obtainUserCollection, obtainTVSeriesCollection, onGenerateError);
            var obtainFamilyCollection = Relegate.create(this, this._obtainFamilyCollection, obtainUserCollection, onGenerateError);
            
            obtainFamilyCollection();
        }
        
        data.DataReportGenerator.prototype._onGenerateSuccess = function()
        {
            this._logEvent("Generate Succeeded!");
        }
        
        data.DataReportGenerator.prototype._onGenerateError = function()
        {
            this._logEvent("Generate Failed!");
        }
        
        data.DataReportGenerator.prototype._obtainFamilyCollection = function(successCallback, errorCallback)
        {
            // Verify data not already present.
            
            this._logEvent("Verifying Family collection data...");
            
            var Family = Parse.Object.extend("Family");
            var query = new Parse.Query(Family);
            
            var onSuccess = Relegate.create(
                this,
                function(list) 
                {
                    this._logEvent("Family collection find success!");
                    if (list.length > 0)
                    {
                        this._logEvent("Family collection data already present...");
                        for (var key in list)
                        {
                            var object = list[key];
                            if (object.className == "Family")
                            {
                                this._savedFamilySet[object.get("familyId")] = object;
                                
                                if (this._logDebugMessages)
                                {
                                    this._logEvent("Family present: " + 
                                        "objectId = " + object.id + "; " +
                                        "familyId = " + object.get("familyId") + "; " +
                                        "displayName = " + object.get("displayName"));
                                }
                            }
                        }
                        successCallback();
                    }
                    else
                    {
                        this._logEvent("Family collection data not present...  canceling");
                        errorCallback();
                    }
                },
                this);
            
            var onError = Relegate.create(
                this,
                function(list, error) 
                {
                    this._logEvent("Family collection find error: " + error.message);
                    errorCallback();
                },
                this);
            
            query.find({ success: onSuccess, error: onError });
        }
        
        data.DataReportGenerator.prototype._obtainUserCollection = function(successCallback, errorCallback)
        {
            // Verify data not already present.
            
            this._logEvent("Verifying User collection data...");
            
            var query = new Parse.Query(Parse.User);
            
            var onSuccess = Relegate.create(
                this,
                function(list) 
                {
                    this._logEvent("User collection find success!");
                    if (list.length > 0)
                    {
                        this._logEvent("User collection data already present...");
                        for (var key in list)
                        {
                            var object = list[key];
                            if (object instanceof Parse.User)
                            {
                                this._savedUserSet[object.id] = object;
                                
                                if (this._logDebugMessages)
                                {
                                    this._logEvent("User present: " + 
                                        "objectId = " + object.id + "; " +
                                        "username = " + object.get("username") + "; " +
                                        "displayName = " + object.get("displayName") + "; " +
                                        "family = " + ((object.get("family")) ? (object.get("family")).id : "<none>"));
                                }
                            }
                        }
                        
                        successCallback();
                    }
                    else
                    {
                        this._logEvent("User collection data not present...  canceling");
                        errorCallback();
                    }
                },
                this);
            
            var onError = Relegate.create(
                this,
                function(list, error) 
                {
                    this._logEvent("User collection find error: " + error.message);
                    errorCallback();
                },
                this);
            
            query.find({ success: onSuccess, error: onError });
        }
        
        data.DataReportGenerator.prototype._obtainTVSeriesCollection = function(successCallback, errorCallback)
        {
            // Verify data not already present.
            
            this._logEvent("Verifying TVSeries collection data...");
            
            var Program = Parse.Object.extend("Program");
            var query = new Parse.Query(Program);
            query.equalTo("mediatype", shared.model.ProgramBrief.TVSERIES);
            query.limit(1000);
            
            var onSuccess = Relegate.create(
                this,
                function(list) 
                {
                    this._logEvent("TVSeries collection find success!");
                    if (list.length > 0)
                    {
                        this._logEvent("TVSeries collection data already present...");
                        for (var key in list)
                        {
                            var object = list[key];
                            if (object.className == "Program")
                            {
                                if (object.get("mediatype") == shared.model.ProgramBrief.TVSERIES)
                                {
                                    this._savedProgramSet[object.id] = object;
                                    
                                    if (this._logDebugMessages)
                                    {
                                        this._logEvent("TVSeries present: " + 
                                            "objectId = " + object.id + "; " +
                                            "mediatype = " + object.get("mediatype") + "; " +
                                            "programId = " + object.get("programId") + "; " +
                                            "title = " + object.get("title"));
                                    }
                                }
                            }
                        }
                        
                        successCallback();
                    }
                    else
                    {
                        this._logEvent("TVSeries collection data not present...  canceling");
                        errorCallback();
                    }
                },
                this);
            
            var onError = Relegate.create(
                this,
                function(list, error) 
                {
                    this._logEvent("TVSeries collection find error: " + error.message);
                    errorCallback();
                },
                this);
            
            query.find({ success: onSuccess, error: onError });
        }
        
        data.DataReportGenerator.prototype._obtainTVEpisodeCollection = function(successCallback, errorCallback)
        {
            // Verify data not already present.
            
            this._logEvent("Verifying TVEpisode collection data...");
            
            var Program = Parse.Object.extend("Program");
            var query = new Parse.Query(Program);
            query.equalTo("mediatype", shared.model.ProgramBrief.TVEPISODE);
            query.limit(1000);
            
            var onSuccess = Relegate.create(
                this,
                function(list) 
                {
                    this._logEvent("TVEpisode collection find success!");
                    if (list.length > 0)
                    {
                        this._logEvent("TVEpisode collection data already present...");
                        for (var key in list)
                        {
                            var object = list[key];
                            if (object.className == "Program")
                            {
                                if (object.get("mediatype") == shared.model.ProgramBrief.TVEPISODE)
                                {
                                    this._savedProgramSet[object.id] = object;
                                    
                                    if (this._logDebugMessages)
                                    {
                                        this._logEvent("TVEpisode present: " + 
                                            "objectId = " + object.id + "; " +
                                            "mediatype = " + object.get("mediatype") + "; " +
                                            "programId = " + object.get("programId") + "; " +
                                            "title = " + object.get("title") + "; " +
                                            "primaryImageURL = " + object.get("primaryImageURL") + "; " +
                                            "mediumImageURL = " + object.get("mediumImageURL") + "; " +
                                            "smallImageURL = " + object.get("smallImageURL") + "; " +
                                            "videoPlayerCtrlImageURL = " + object.get("videoPlayerCtrlImageURL") + "; " +
                                            "videoURL = " + object.get("videoURL") + "; " +
                                            "parentProgram = " + ((object.get("parentProgram")) ? (object.get("parentProgram")).id : "<none>"));
                                    }
                                }
                            }
                        }
                        
                        successCallback();
                    }
                    else
                    {
                        this._logEvent("TVEpisode collection data not present...  canceling");
                        errorCallback();
                    }
                },
                this);
            
            var onError = Relegate.create(
                this,
                function(list, error) 
                {
                    this._logEvent("TVEpisode collection find error: " + error.message);
                    errorCallback();
                },
                this);
            
            query.find({ success: onSuccess, error: onError });
        }
        
        data.DataReportGenerator.prototype._generateReports = function(successCallback, errorCallback)
        {
            this._logEvent("Generating reports...");
            
            var methodToCall = successCallback;
            
            for (var familyId in this._savedFamilySet)
            {
                methodToCall = Relegate.create(
                    this,
                    this._generateReportForFamily,
                    familyId,
                    methodToCall,
                    errorCallback);
            }
            
            methodToCall();
        }
        
        data.DataReportGenerator.prototype._generateReportForFamily = function(familyId, successCallback, errorCallback)
        {
            this._logEvent("Generating report for family (id=" + familyId + ")...");
            
            var ApplicationLog = Parse.Object.extend("ApplicationLog");
            var query = new Parse.Query(ApplicationLog);
            query.equalTo("familyId", familyId);
            query.ascending("createdAt");
            query.limit(10000);
            
            var processResults = Relegate.create(
                this,
                function(list) 
                {
                    this._logEvent("ApplicationLog (" + familyId + ") collection find success: list.length = " + list.length);
                    if (list.length > 0)
                    {
                        this._logEvent("ApplicationLog (" + familyId + ") collection data present...");
                        
                        this._printReportHeader();
                        
                        for (var key in list)
                        {
                            var object = list[key];
                            if (object.className == "ApplicationLog")
                            {
                                if (this._logDebugMessages)
                                {
                                    this._logEvent("ApplicationLog (" + familyId + ") present: " + 
                                        "objectId = " + object.id + "; " +
                                        "familyId = " + object.get("familyId") + "; " +
                                        "applicationId = " + object.get("applicationId") + "; " +
                                        "eventCode = " + object.get("eventCode") + "; " +
                                        "eventData = " + object.get("eventData") + "; " +
                                        "localDeviceTime = " + object.get("localDeviceTime") + "; " +
                                        "message = " + object.get("message") + "; " +
                                        "userId = " + object.get("userId"));
                                }
                                
                                var eventCode = object.get("eventCode");
                                
                                
                                //this._logEvent(object.get("localDeviceTime"));
                                var localDeviceTime = moment(object.get("localDeviceTime"), "ddd MMM DD YYYY HH:mm:ss Z");
                                
                                if (eventCode == "userLogin")
                                {
                                    this._printUserLoginReport(localDeviceTime, object.get("userId"));
                                }
                                else if (eventCode == "userLogout")
                                {
                                    this._printUserLogoutReport(localDeviceTime, object.get("userId"));
                                }
                                else if (eventCode == "newRecGenerated")
                                {
                                    this._printNewRecommendationReport(localDeviceTime, object.get("eventData"));
                                }
                                else if (eventCode == "loadingVideo")
                                {
                                    this._printWatchingVideoReport(localDeviceTime, object.get("eventData"));
                                }
                                else if (eventCode == "themeSelected")
                                {
                                    this._printThemeSelectedReport(localDeviceTime, object.get("eventData"));
                                }
                            }
                        }
                        
                        successCallback();
                    }
                    else
                    {
                        this._logEvent("ApplicationLog (" + familyId + ") collection data not present...");
                        successCallback();
                    }
                },
                this);
            
            var getAllResults = function(list, startIndex, resultList, continueCallback, resultCallback)
            {
                if (list.length > 0)
                {
                    for (var i = 0; i < list.length; i++)
                    {
                        resultList.push(list[i]);
                    }
                
                    query.skip(startIndex + list.length);
                    
                    var onSuccess = Relegate.create(
                        this, 
                        continueCallback, 
                        (startIndex + list.length), 
                        resultList, 
                        continueCallback, 
                        resultCallback);
                    
                    query.find({ success: onSuccess, error: onError });
                }
                else
                {
                    resultCallback(resultList);
                }
            };
            
            var onSuccess = Relegate.create(this, getAllResults, 0, [], getAllResults, processResults);
            
            var onError = Relegate.create(
                this,
                function(list, error) 
                {
                    this._logEvent("ApplicationLog (" + familyId + ") collection find error: " + error.message);
                    
                    //  Allow success in order to allow for continuation on other family ids
                    successCallback();
                },
                this);
            
            query.find({ success: onSuccess, error: onError });
        }

        data.DataReportGenerator.prototype._printReportHeader = function()
        {
            var headerList = ["localDeviceTime(Date)", "localDeviceTime(Time)", "userLogin", "newRecGenerated", "loadingVideo", "themeSelected", "userLogout"];
            this._logger.logEvent(headerList.join(","));
        }

        data.DataReportGenerator.prototype._printUserLoginReport = function(localDeviceTime, userObjectId)
        {
            var username = (this._savedUserSet[userObjectId]) ? this._savedUserSet[userObjectId].get("username") : userObjectId;
            this._printReportRow(localDeviceTime, [username, "", "", "", ""]);
        }

        data.DataReportGenerator.prototype._printUserLogoutReport = function(localDeviceTime, userObjectId)
        {
            var username = (this._savedUserSet[userObjectId]) ? this._savedUserSet[userObjectId].get("username") : userObjectId;
            this._printReportRow(localDeviceTime, ["", "", "", "", username]);
        }

        data.DataReportGenerator.prototype._printNewRecommendationReport = function(localDeviceTime, eventData)
        {
            var programObjectId = eventData.substring("rejected:".length);
            var programName = (this._savedProgramSet[programObjectId]) ? this._savedProgramSet[programObjectId].get("title") : programObjectId;
            this._printReportRow(localDeviceTime, ["", programName, "", "", ""]);
        }

        data.DataReportGenerator.prototype._printWatchingVideoReport = function(localDeviceTime, eventData)
        {
            var programObjectId = eventData;
            var programName = (this._savedProgramSet[programObjectId]) ? this._savedProgramSet[programObjectId].get("title") : programObjectId;
            this._printReportRow(localDeviceTime, ["", "", programName, "", ""]);
        }

        data.DataReportGenerator.prototype._printThemeSelectedReport = function(localDeviceTime, eventData)
        {
            var themeId = eventData.substring("selected:".length);
            this._printReportRow(localDeviceTime, ["", "", "", themeId, ""]);
        }

        data.DataReportGenerator.prototype._printReportRow = function(localDeviceTime, rowDataList)
        {
            if (this._logger)
            {
                var message = 
                    (rowDataList && rowDataList.length > 0) ? 
                        (
                            localDeviceTime.format("ddd MMM DD YYYY") + "," + 
                            localDeviceTime.format("HH:mm:ss") + "," + 
                            rowDataList.join(",")) : 
                        "";
                this._logger.logEvent(message);
            }
        }

        data.DataReportGenerator.prototype._logEvent = function(message)
        {
            if (this._logger)
            {
                this._logger.logEvent(message);
            }
        }

        data.DataReportGenerator.prototype._clearLog = function()
        {
            if (this._logger)
            {
                this._logger.clearLog();
            }
        }
        
    }
});
