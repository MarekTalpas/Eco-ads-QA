(function() {
    function isAndroid() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return (/android/i.test(userAgent));
    }
    
    function removeInternalPrefixFromLinks() {
        if (isAndroid()) {
            var allAnchors = document.getElementsByTagName("a");
            
            for (var i=0, max=allAnchors.length; i < max; i++) {
                var containInternalSuffix = /internal-/.test(allAnchors[i].href);
                if (containInternalSuffix) {
                    var linkWithoutInternal = allAnchors[i].href.replace('internal-', '');
                    allAnchors[i].setAttribute('href', linkWithoutInternal);
                }
            }
        } 
    }
    
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function setEcoOpenHack() {
        if (eco.open && isAndroid()) {
            var allElements = document.getElementsByTagName('*');
            var firstSplitString = 'onclick(event) {';
            var firstSplitStringLength = firstSplitString.length;
            var secondSplitString = 'eco.open';
        
            for (var i=0, max=allElements.length; i < max; i++) {
                if (/eco\.open/.test(String(allElements[i].onclick))) {
                    var link = String(allElements[i].onclick).split('open(')[1].split(')')[0];
        
                    var firstBreakpointNumber = Number(String(allElements[i].onclick).indexOf(firstSplitString)) + firstSplitStringLength;
                    var secondBreakpointNumber = Number(String(allElements[i].onclick).indexOf(secondSplitString));
                    var thirdBreakpointNumber = Number(String(allElements[i].onclick).indexOf(link));
                    var endBreakpointNumber = Number(String(allElements[i].onclick).lastIndexOf('}'));
                    var beforeEcoOpen = String(allElements[i].onclick).substring(firstBreakpointNumber, secondBreakpointNumber);
                    var afterEcoOpen = String(allElements[i].onclick).substring(thirdBreakpointNumber + link.length + 1, endBreakpointNumber);
        
                    allElements[i].setAttribute("onClick", beforeEcoOpen + "ecoOpenHack(" + link + ')' + afterEcoOpen);
                }
            }
        }
    }
    
    function init() {
        removeInternalPrefixFromLinks();
        setEcoOpenHack();
    }

    document.addEventListener('DOMContentLoaded', init, false);

}());

function ecoOpenHack(url, tabletOptUrl) {
    {
        if (isMobile.phone) {
            if (!_prodReady) {
                window.location = url;
                eco.sendGA('external', url, eco.time.action());
            } else {
                window.location = url;
                eco.sendGA('external', url, eco.time.action());
            }
        } else if (tabletOptUrl !== undefined) {
            if (!_prodReady) {
                window.location = tabletOptUrl;
                eco.sendGA('external', tabletOptUrl, eco.time.action());
            } else {
                window.location = tabletOptUrl;
                eco.sendGA('external', tabletOptUrl, eco.time.action());
            }
        } else {
            if (!_prodReady) {
                window.location = url;
                eco.sendGA('external', url, eco.time.action());
            } else {
                window.location = url;
                eco.sendGA('external', url, eco.time.action());
            }
        }
    };
}
