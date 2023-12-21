function loadIframe(divId, url) {
  var iframeContainer = document.getElementById(divId);

  var iframe = document.createElement("iframe");

  iframe.src = url;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  iframe.style.cellSpacing = "0";
  iframe.style.borderStyle = "none";

  iframeContainer.appendChild(iframe);
}
