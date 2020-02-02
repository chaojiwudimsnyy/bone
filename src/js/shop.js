class Car {
		constructor() {

		}

		// 通过goods-order的数量改变序号
		order() {
			let xh = document.getElementsByClassName('goods-order');
			for (let i = 0; i < xh.length; i++) {
				xh[i].innerHTML = i + 1;
			}
		}

		//商品总数量
		goodsNums() {
			let oGoodsNums = document.getElementById("goods-total-nums");
			let oGoodsNum = document.getElementsByClassName("goods-num");
			let goodsNums = 0;
			for (let i = 0; i < oGoodsNum.length; i++) {
				goodsNums += +oGoodsNum[i].innerHTML;
			}
			oGoodsNums.innerHTML = goodsNums;
		}

		//商品总价钱
		goodsPrices() {
			let oGoodsPrices = document.getElementById("goods-totla-prices");
			let oGoodsSinglePrice = document.getElementsByClassName("goods-single-price");
			let goodsPrices = 0;
			for (let i = 0; i < oGoodsSinglePrice.length; i++) {
				goodsPrices += +oGoodsSinglePrice[i].innerHTML;
			}
			oGoodsPrices.innerHTML = goodsPrices;
		}

		//增加商品数量
		addNum(btn) {
			let oGoodsNum = btn.previousElementSibling;
			let oGoodsPrice = btn.parentNode.nextElementSibling.firstElementChild;
			let oGoodsSinglePrice = btn.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
			oGoodsNum.innerHTML++;
			oGoodsSinglePrice.innerHTML = this.getXiaoji(oGoodsNum.innerHTML, oGoodsPrice.innerHTML);
			this.goodsNums();
			this.goodsPrices();
		}

		//减少商品数量
		reduceNum(btn) {
			let oGoodsNum = btn.nextElementSibling;
			let oGoodsPrice = btn.parentNode.nextElementSibling.firstElementChild;
			let oGoodsSinglePrice = btn.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
			if (oGoodsNum.innerHTML <= 1) {
				alert('没得减啦');
			} else {
				oGoodsNum.innerHTML--;
			}
			oGoodsSinglePrice.innerHTML = this.getXiaoji(oGoodsNum.innerHTML, oGoodsPrice.innerHTML);
			this.goodsNums();
			this.goodsPrices();

		}
		getXiaoji(num, price) {
			return num * price;
		}

		//删除商品
		delGoods(btn) {
			let oTr = btn.parentNode.parentNode;
			oTr.remove();
			this.goodsNums();
			this.goodsPrices();
		}

		//按钮事件
		eventBtn() {
			let that = this;
			//数量增加减少按钮
			let reduceBtn = document.getElementsByClassName("goods-num-reduce");
			let addBtn = document.getElementsByClassName("goods-num-add");
			for (let i = 0; i < reduceBtn.length; i++) {
				reduceBtn[i].onclick = function () {
					that.reduceNum(this);
				}
			}
			for (let i = 0; i < addBtn.length; i++) {
				addBtn[i].onclick = function () {
					that.addNum(this);
				}
			}

			//删除按钮
			let delBtn = document.getElementsByClassName("delete-goods");
			for (let i = 0; i < delBtn.length; i++) {
				delBtn[i].onclick = function () {
					that.delGoods(this);
					that.order();
				}
			}

			//增加商品
			let oAddBtn = document.getElementsByClassName("add-goods");

			for (let i = 0; i < oAddBtn.length; i++) {
				oAddBtn[i].onclick = function () {
					// 点击的当前的添加按钮所在行的商品名
					let oAddName = this.parentNode.previousElementSibling.previousElementSibling.innerText
					// 商品单价
					let oAddPrice = this.parentNode.previousElementSibling.firstElementChild.innerHTML;
					// 第一个table

					let table = document.getElementById('tableBox');
					// table的每一行	
					let rows = table.rows;
					let isExist = false; // 假定商品列表没有重复的
					for (let i = 1; i < rows.length - 1; i++) {
						if (rows[i].cells[1].innerText == oAddName) { // 有重复的
							// 将按钮作为实参传递
							that.addNum(rows[i].cells[2].lastElementChild);
							// 有重复则置为true	
							isExist = true;
							that.goodsPrices();
							that.goodsNums();
							break;
						}
						
						
					}
					// 没重复直接添加
					if (isExist == false) {
						let lastTr = document.getElementById("lastTr");
						lastTr.remove();
						table.firstElementChild.innerHTML += `
						<tr>
							<td><span class="goods-order"></span></td>
							<td><span class="goods-name">${oAddName}</span></td>
							<td>
								<button class="goods-num-reduce">-</button>
								<span class="goods-num">1</span>
								<button class="goods-num-add">+</button>
								</td>
							<td>单价：<span class="goods-price">${oAddPrice}</span>元</td>
							<td>小计：<sapn class="goods-single-price">10</sapn>元</td>
							<td>操作：<input type="button" value="删除" class="delete-goods"></td>
							</tr>
						<tr id="lastTr">
							<td colspan="6">商品一共 <span id="goods-total-nums">0</span> 件；总计 <span id="goods-totla-prices">0</span> 元</td>
							</tr>
						`
					}
					that.goodsPrices();
					that.goodsNums();
					that.order();
					that.eventBtn();
				}
			}
		}

	}