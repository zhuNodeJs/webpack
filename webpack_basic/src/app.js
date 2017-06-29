import './css/common.css'
import Layer from './components/layer/layer.js'
const App = function() {
	var dom = document.getElementById('app');

	var tpl = (new Layer()).tpl({
		name:'xiaozhu',
		arr:['apple','xiaomi','oppo','hauwie']
	});
	console.log(tpl);
	dom.innerHTML = tpl;
}
new App();