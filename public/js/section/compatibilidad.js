$(document).ready(function(){
	if(!isMobile){
		$("#ayuda").hide();
		setInterval(function(){
			if( document.getElementById("compatible") != null){
				obj = document.getElementById("compatible");
				if(obj.contentWindow.document.getElementById("wrapper") != null){
					if (obj.style.display != "block"){
						obj.style.display = 'block';
						obj.style.width = obj.contentWindow.document.getElementById("wrapper").scrollWidth + 'px';
					}
					obj.style.height = obj.contentWindow.document.getElementById("wrapper").scrollHeight + 'px';
				}
			}
		}, 33);
	}
});
