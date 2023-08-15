var prevUrl = null;
      var currentPage = location.href;

      setInterval(function () {
        var iframe = 
document.getElementById("kalender");
        
iframe.contentWindow.postMessage("getLocationHref", 
iframe.src);
      }, 1000);

      setInterval(function () {
        if (currentPage != location.href) {
          currentPage = location.href;
          window.scrollTo({ top: 0 });
        }
      }, 100);

      window.addEventListener("message", 
(event) => {
        if (
          event.origin !== 
"https://dykarna.plingot.com" &&
          event.origin !== 
"https://dykarna.plingot.com" &&
          event.origin !== 
"https://dykarna.plingot.com" &&
          event.origin !== 
"https://dykarna.plingot.com"
        ) {
          return;
        }

        const iframeLocationHref = 
event.data.href;
        if (iframeLocationHref !== prevUrl) 
{
          prevUrl = iframeLocationHref;
          
onIframeUrlChange(iframeLocationHref);

          if (typeof event.data.height === 
"number") {
            resizeIframe(event.data.height);
          }
        }
      });

      function resizeIframe(height) {
        var iframe = 
document.getElementById("kalender");
        iframe.style.height = height + 50 + 
"px";
      }

      function extractValue(url) {
        const startIndex = 
url.indexOf("/event/") + 7;
        const endIndex = url.indexOf("/", 
startIndex);

        if (startIndex !== -1 && endIndex 
=== -1) {
          return url.substring(startIndex, 
url.length);
        } else if (startIndex !== -1 && 
endIndex !== -1) {
          return url.substring(startIndex, 
endIndex);
        }

        return "";
      }

      function onIframeUrlChange(newUrl) {
        if (newUrl.includes("event/")) {
          if (location.search === "") {
            const eventId = 
extractValue(newUrl);
            
window.history.replaceState(null, null, 
`?eventId=${eventId}`);
          }
        } else {
          if 
(location.search.includes("?eventId=")) {
            
window.history.replaceState(null, null, 
"/");
          }
        }
      }
