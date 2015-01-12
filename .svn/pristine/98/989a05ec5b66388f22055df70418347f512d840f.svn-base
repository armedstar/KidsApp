function includeJS(url) 
{
  if (false == isJSIncluded(url))
  {
    console.log("includeJS(): INCLUDING SCRIPT: " + url);
    var Script = document.createElement("script");
    Script.type = "text/javascript";
    Script.src = url;
    document.getElementsByTagName("head")[0].appendChild(Script); 
  }  
}

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

function isJSIncluded(url)
{
  var headNodes = document.getElementsByTagName("head")[0].childNodes;
  var idx = 0;
  var ret = false;
  for(idx = 0; idx < headNodes.length; idx++)
  {
    var node = headNodes.item(idx);
    if (node.nodeName == "SCRIPT" && 
        node.nodeType == 1 && /* element type */
        node.getAttribute("src") == url)
    {
      ret = true;
      break;
    }
  }
  return ret;
}

function getCurrentDateTimeStr() {
    var curDate = new Date();
    return curDate.toString();
}

function getMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof(obj[id]) == "function") {
                result.push(id + ": " + obj[id].toString());
            }
        } catch (err) {
            result.push(id + ": inaccessible");
        }
    }
    return result;
}

function getElementPosition(element)
{
    var elem=element, tagname="", x=0, y=0;
    
    while ((elem != null) && (typeof(elem) == "object") && (typeof(elem.tagName) != "undefined"))
    {
        y += elem.offsetTop;
        x += elem.offsetLeft;
        
        tagname = (elem.tagName != null) ? elem.tagName.toUpperCase() : "";
        
        if(tagname == "BODY")
        {
            elem=0;
        }
        
        if (typeof(elem) == "object")
        {
            if (typeof(elem.offsetParent) == "object")
            {
                elem = elem.offsetParent;
            }
        }
    }
    
    return {x: x, y: y};
}

Array.prototype.shuffle = function() 
{
    var s = [];
    while (this.length)
    {
        var index = Math.floor(Math.random() * this.length);
        var item = (this.splice(index, 1))[0];
        s.push(item);
    }
    while (s.length) 
    {
        this.push(s.pop());
    }
    return this;
}

if (typeof String.prototype.startsWith != 'function') 
{
    String.prototype.startsWith = function (str)
    {
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') 
{
    String.prototype.endsWith = function (str)
    {
        return this.slice(-str.length) == str;
    };
}