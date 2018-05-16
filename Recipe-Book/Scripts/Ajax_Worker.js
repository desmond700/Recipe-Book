//javaScript Document

self.onmessage = function (event) {
    if (event.data === "fetch")
        load();
}

function load() {
	var data;

	if(typeof XMLHttpRequest !== 'undefined') data = new XMLHttpRequest();
	else {
		var versions = ["MSXML2.XmlHttp.5.0", 
			 	"MSXML2.XmlHttp.4.0",
			 	"MSXML2.XmlHttp.3.0", 
			 	"MSXML2.XmlHttp.2.0",
			 	"Microsoft.XmlHttp"]

		for(var i = 0, len = versions.length; i < len; i++) {
		try {
			data = new ActiveXObject(versions[i]);
			break;
		}
			catch(e){}
		} // end for
	}
		
	data.onreadystatechange = ensureReadiness;
		
	function ensureReadiness() {
		if(data.readyState < 4) {
			return;
		}
			
		if(data.status !== 200) {
			return;
		}

		// all is well	
        if (data.readyState === 4) {
            self.postMessage(JSON.parse(data.responseText));
		}			
	}
		
	data.open('GET', '../Content/Recipes.json', true);
	data.send('');
}
