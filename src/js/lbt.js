class Banner{
		constructor(newbox,newli,prev,next) {//初始化
		    this.index=0;   //当前索引为0
			this.box=newbox; //当前盒子
			this.li=newli;//当前盒子下的所有li
			this.box.style.backgroundImage=" url(img/"+this.index+".jpg)"; //给当前盒子设置背景图片
			this.li[this.index].style.backgroundColor="red";//给默认选中的li加背景颜色红色·
			
			this.getEvent(prev,next);//添加左右点击事件
		}
		// 设置box背景图
		Setboximg(){
			this.box.style.backgroundImage=" url(img/"+this.index+".jpg)";
		}
		//设置li背景颜色
		Setlicolor(){
			for(let i=0;i<this.li.length;i++){
				if(i==this.index){
					this.li[i].style.backgroundColor="red";
				}else{
					this.li[i].style.backgroundColor="black";
				}
			}
		}
		// 上一个按钮
		prevbtn(){
			this.index--;
			if(this.index<0){
				this.index=this.li.length-1;
			}
			this.Setboximg();
			this.Setlicolor();
		}
		//下一个按钮
		nextbtn(){
			this.index++;
			if(this.index==this.li.length){
				this.index=0
			}
			this.Setboximg();
			this.Setlicolor();
		}
		// 定时器
		settime(){
			let that=this;
			let	time=setInterval(function(){
				that.index++;
				if(that.index==that.li.length){
					that.index=0;
				}
				that.Setboximg();
				that.Setlicolor();
			},2000);
			this.box.onmouseout=function(){
				clearInterval(time);
				that.settime();
			}
			this.box.onmouseover=function(){
				clearInterval(time);
			}
		}
		// 方法调用
		getEvent(prev,next){
			let that=this;  //防止this转移
			let btn1=prev;
			let btn2=next;
			btn1.onclick=function(){
				that.prevbtn();
			}
			btn2.onclick=function(){
				that.nextbtn();
			}
			//给小点点加点击事件
			for(let i=0;i<this.li.length;i++){
				this.li[i].onclick=function(){
					that.index=i;
					that.Setlicolor();
					that.Setboximg();
				}
			}
			this.settime();
		}
	}