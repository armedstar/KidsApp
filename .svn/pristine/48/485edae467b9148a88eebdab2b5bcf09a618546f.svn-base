
var Twilio = require('twilio');
Twilio.initialize('AC22f3241e9e15c3c2e08a627472acc188', '1db4fc543ae2830d562553dcecec9961');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("ping", function(request, response) 
{
    response.success("Hello world!");
});

Parse.Cloud.define("recommendations", function(request, response) 
{
    var userId = request.params.userId;
    var contextId = request.params.contextId;

    var innerQuery = new Parse.Query(Parse.User);
    innerQuery.equalTo("objectId", userId);
    
	var ProgramList = Parse.Object.extend("ProgramList");
    var query = new Parse.Query(ProgramList);
    query.matchesQuery("user", innerQuery);
    query.equalTo("contextId", contextId);
    query.include("programs.parentProgram");
    query.first(
    {
        success: function(programList) 
        {
            if (programList)
            {
                response.success(programList.get("programs"));
            }
            else
            {
                response.success(new Array());
            }
        },
        error: function(users, err) 
        {
            console.log("Unable to obtain program list: userId = " + userId + "; contextId = " + contextId + "; err = " + err.message);
            response.error(err);
        }
    });
});

Parse.Cloud.define("notifySMS", function(request, response)
{
	var sms = request.params.sms;
	var message = request.params.message;
	
	Twilio.sendSMS({
		From: "+12245455298",
		To: sms,
		Body: message}, {
		success: function(httpResponse) {
			console.log(httpResponse);
			response.success("SMS sent");
		},
		error: function(httpResponse) {
			console.error(httpResponse);
			response.error("Couldn't send SMS");
		}
		});
});
