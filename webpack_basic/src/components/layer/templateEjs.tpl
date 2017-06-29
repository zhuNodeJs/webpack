<div class="layer">
	<img src="${ require('../../assets/b.jpg') }" alt="">
	<div class="layerHead">this is <%= name %> layer</div>
	<% for(var i = 0; i < arr.length; i++) { %>
		<div class="layerTitle"><%= arr[i] %></div>
	<%}%>
</div>