new Vue({
	el:'#app',
	data: {
		totalMoney: 0,
		productList: [],
		allSelectBtn: false,
		isShow: false,
		currProdect:'',
		checkAllFlag: false,
		showConfirm: false,
		toDelItem: ''
	},
	mounted: function() {
		this.$nextTick(function() {
			this.createView();
		})
	},
	filters: {
		formatMoney:function(value) {
			return '￥'+value.toFixed(2); 
		}
	},
	computed: {
		calTotlaPrice: function() {
			this.totalMoney = 0;
			var _this = this;
			this.productList.forEach(function(item, index) {
				if(item.isChecked){
					console.log(this.totalMoney)
					_this.totalMoney += item.productPrice * item.productQuantity;					
				}
			})	
			return this.totalMoney;
		}
	},
	methods: {
		createView: function() {
			this.$http.get('data/cartData.json').then(res => {
				//箭头函数的内外的this是相同的
				this.productList = res.data.result.list;				
			})
		},
		changeNumber(item, way) {
			if(way > 0) {
				item.productQuantity++;
			}else {
				item.productQuantity = item.productQuantity-- > 1 ? item.productQuantity : 1;
			}
		},
		changeCKStatus(item) {
			if(typeof item.isChecked === 'undefined') {
				this.$set(item,'isChecked',true);
			}else{
				item.isChecked = !item.isChecked;
			}
			if(decideStatus(this.productList)){
				this.checkAllFlag = true;
			}else {
				this.checkAllFlag = false;
			};
		},
		checkAll(flag) {
			this.productList.forEach((item,index) => {
				if(typeof item.isChecked === 'undefined') {
						this.$set(item,'isChecked',true);
				}else {
					if(flag > 0) {
						item.isChecked = true;
						this.checkAllFlag = true;
					}else{
						this.checkAllFlag = false;
						item.isChecked = false;
					}					
				}
			});
		},		
		delThis(item) {
			this.showConfirm = true;
			this.toDelItem = item;			
		},
		delItem() {			
			let index = this.productList.indexOf(this.toDelItem);
			this.productList.splice(index,1);
			this.showConfirm = false;
		}
	}
})

Vue.filter('moneyPublic',function(value) {
	return '￥'+value.toFixed(2)+'元';
})

function decideStatus(objArr) {	
			var returnValue = true;
			objArr.forEach(function(item, index) {	
			if(typeof item.isChecked === 'undefined' || !item.isChecked){
				returnValue = false;
				}
			});
			return returnValue;
}