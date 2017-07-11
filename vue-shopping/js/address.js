new Vue({
	el:'.container',
	data: {
		limitNum:3,
		addressList:[],
		currentIndex:0,
		shippingMethod:1,
		showConfirm:false,
		delItemObj:'',
		addConfirmFlag: false,
		addUserName:'',
		addUserAddress:'',
		addUserTel:''
	},
	created: function() {
		this.$nextTick(() => {
			this.getAddress();
		})
	},
	computed: {
		filteredItems: function() {
			return this.addressList.slice(0, this.limitNum);
		}
	},
	methods: {
		getAddress() {
			this.$http.get('data/address.json').then((res) => {
				if(res.body.status === 0){
					this.addressList = res.body.result;
				}				
			})
		},
		loadMore() {
			this.limitNum = this.addressList.length;
		},
		setDefault(addressId){
			this.addressList.forEach((item, index) => {
				if(item.addressId === addressId) {
					item.isDefault = true;
				}else {
					item.isDefault = false;
				}
			})
		},
		delItem(item) {
			this.showConfirm = true;
			this.delItemObj = item;
		},
		delConfirm() {			
			var indexItem = this.addressList.indexOf(this.delItemObj);
			this.addressList.splice(indexItem,1);
			this.showConfirm = false;
		},
		hiddeConfirm() {
			this.showConfirm = false;
			this.addConfirmFlag = false;
		},
		saveAddUserInfo() {
			let addUser = {
			      "addressId":new Date().getTime(),
			      "userName":this.addUserName,
			      "streetName":this.addUserAddress,
			      "postCode":"100001",
			      "tel":this.addUserTel,
			      "isDefault":false
			    }
			console.log(addUser);
			this.addressList.push(addUser);
			this.addConfirmFlag = false;
			console.log(this.addressList);
		}
	}
});
