var to_id = "obheeflpdipmaefcoefhimnaihmhpkao";

var totalCount = 0;

var html = [];
var count = [];

 count['A'] = 0;
 count['B'] = 0;
 count['C'] = 0;
 count['D'] = 0;
 count['E'] = 0;
 html['A'] = "";
 html['B'] = "";
 html['C'] = "";
 html['D'] = "";
 html['E'] = "";
 
var catA = [];
var catB = [];
var catC = [];
var catD = [];
var catE = [];

var mainHtml = "";

var div = "";

// Get tracker on current tab as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {                              
    chrome.runtime.sendMessage(to_id, {type : 'getTrackers'},
             function(trackerList) {
		    	mainHtml = getHtmlForTotal(trackerList)
		        div = document.getElementById("total");
		        div.innerHTML = mainHtml;
		        
		        div=document.getElementById("CatA");
		        setupLinks(div, catA, "A", html['A'], count['A']);
		        
		        div=document.getElementById("CatB");
		        setupLinks(div, catB, "B", html['B'], count['B']);

		        div=document.getElementById("CatC");
		        setupLinks(div, catC, "C", html['C'], count['C']);
		        
		        div=document.getElementById("CatD");
		        setupLinks(div, catD, "D", html['D'], count['D']);
		        
		        div=document.getElementById("CatE");
		        setupLinks(div, catE, "E", html['E'], count['E']);
    		 }
    );                          
});

  
function getBlockLink(category) {
return "<a class='block' id='"+category+"' href='#'>BLOCK ALL IN THIS CATEGORY</a>";
}

function getUnblockLink(category) {
return "<a class='unblock' id='"+category+"' href='#'>UNBLOCK ALL IN THIS CATEGORY</a>";
}

function blockCat(list, id)
{ 
       var link = document.getElementById(id);
       if(document.getElementById("advanced").checked){
	       if (link.getAttribute("class") == "unblock") {
	            (function (_list) {
	             link.addEventListener('click', function() {      	 
	            	 chrome.runtime.sendMessage(to_id, {type: 'unblockCategory', category: id});
	            	 div=document.getElementById("Cat" + id);
	 		        setupLinks(div, list, id, html[id], count[id]);
	             	});
	             })(list);
	        }
	      else if (link.getAttribute("class") == "block") {
	            (function (_list) {
	             link.addEventListener('click', function() {
	                chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: id});
	                div=document.getElementById("Cat" + id);
	  		        setupLinks(div, list, id, html[id], count[id]);                  
	        });
	             })(list);         
	      }
      }
        (function () {
        	document.getElementById("advanced").addEventListener('click', function() {      	 
           	 div=document.getElementById("Cat" + id);
		        setupLinks(div, list, id, html[id], count[id]);
            	});
            })();
        (function () {
        	document.getElementById("L").addEventListener('click', function() {      	 
        		chrome.runtime.sendMessage(to_id, {type: 'unblockCategory', category: 'A'});
        		chrome.runtime.sendMessage(to_id, {type: 'unblockCategory', category: 'B'});
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'C'});
        		chrome.runtime.sendMessage(to_id, {type: 'unblockCategory', category: 'D'});
        		chrome.runtime.sendMessage(to_id, {type: 'unblockCategory', category: 'E'});
        		div=document.getElementById("Cat" + id);
        		setupLinks(div, list, id, html[id], count[id]);
            	});
            })();
        (function () {
        	document.getElementById("M").addEventListener('click', function() {      	 
        		chrome.runtime.sendMessage(to_id, {type: 'unblockCategory', category: 'A'});
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'B'});
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'C'});
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'D'});
        		chrome.runtime.sendMessage(to_id, {type: 'unblockCategory', category: 'E'});
        		div=document.getElementById("Cat" + id);
        		setupLinks(div, list, id, html[id], count[id]);
            	});
            })();
        (function () {
        	document.getElementById("H").addEventListener('click', function() {      	 
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'A'});
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'B'});
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'C'});
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'D'});
        		chrome.runtime.sendMessage(to_id, {type: 'blockCategory', category: 'E'});
        		div=document.getElementById("Cat" + id);
        		setupLinks(div, list, id, html[id], count[id]);
            	});
            })();    
}

function setupLinks(div, list, id, html, count)
{ 
	var emptyLink = "";
    if(count==0)
    	{
    	div.innerHTML = "<div style='height:130px;text-align:center;font:16px/26px Open Sans;overflow:auto;'><br><br>No category " + id + " trackers detected.";
    	return;
    	}
    chrome.runtime.sendMessage(to_id, {type: 'getBlockedCategories'},
    function(blockedCatList) {
                               
        if (blockedCatList[id]) {
               emptyLink += " <br> " + getUnblockLink(id);
               var finalHtml = "<s>"+html+"</s>";
        }
        else {
               emptyLink += "<br>" + getBlockLink(id);
               finalHtml = html;
        }
       if(document.getElementById("advanced").checked==false)
    	   {
    	   div.innerHTML = "<br><div style='height:130px;text-align:left;font:16px/26px Open Sans;overflow:auto;'>" + finalHtml + "</div><br>" + count +" Category " + id + " trackers detected.";
    	   blockCat(list,id);
    	   }
       else{
        div.innerHTML = emptyLink+"<br><br><div style='height:130px;text-align:left;font:16px/26px Open Sans;overflow:auto;'>" + finalHtml + "</div><br>" + count +" Category " + id + " trackers detected.";
        blockCat(list, id);
       }
    });
}
    
function getHtmlForTotal(trackerList) {
	if (!trackerList || trackerList.length == 0) 
        return "No trackers.";
    
	for (var trackerDomain in trackerList) {
        var trackerObject = trackerList[trackerDomain];
        totalCount++;
        
        if (trackerObject.categoryList.indexOf("A") != -1){
            catA[count["A"]] = trackerDomain;
            count["A"]++;
            html["A"]+= trackerObject.domain + "<br>";
        }
        if (trackerObject.categoryList.indexOf("B") != -1){
            catB[count["B"]] = trackerDomain;
            count["B"]++;
            html["B"]+= trackerDomain+"<br>";
        }
        if (trackerObject.categoryList.indexOf("C") != -1){
            catC[count["C"]] = trackerObject.domain;
            count["C"]++;
            html["C"]+= trackerObject.domain+"<br>";
        }
        if (trackerObject.categoryList.indexOf("D") != -1){
            catD[count["D"]] = trackerObject.domain;
            count["D"]++;
            html["D"]+= trackerObject.domain+"<br>";
        }
        if (trackerObject.categoryList.indexOf("E") != -1){
            catE[count["E"]] = trackerObject.domain;
            count["E"]++;
            html["E"]+= trackerObject.domain+"<br>";
        }     
    }  
    mainHtml += "Total number of unique tracking domains: " + totalCount;   
	return mainHtml;
}


