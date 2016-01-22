/**
 *	概要信息 = {
 *		"作者" : "代皓予" ,
 *  	"创建时间" : "2016/1/20" ,
 *   	"最后修改时间" : "2016/1/21" ,
 *    	"用途" : "为了简单" 
 * 	}
 *
 *  工具信息 = {
 *  	Smartahou.type  //方法 用于返回第一个参数的类型 
 *  	Smartahou.isArray  //方法 用于判断传入的第一个参数是否是数组 
 *  }
 *
 *
 *
 *	
 * 
 */

(function(){

	this.Smartahou = {};

	var typeArr = ['boolean' , 'number' , 'string' , 'function' , 'array' , 'object' , 'date' , 'regexp' , 'error'];

	this.SA = Smartahou;

	SA.balabala_obj = [];

	var move_obj = null;


	SA.type = function( argu ){
		var i , class_name;
		if(argu !== argu){ return 'NaN'; }
		if(argu == null){ return argu+''; }
		if(typeof argu === 'object' || typeof argu === 'function'){
			class_name = Object.prototype.toString.call( argu );
			for(i=0;i<typeArr.length;i++){
				if('[object '+typeArr[i]+']' === class_name.toLowerCase()){
					return typeArr[i];
				}
			}
		}
		return typeof argu;
	}

	SA.isArray = function( argu ){
		return this.type(argu) === 'array' ? true : false;
	}

	SA.getExt = function( argu ){
		var index;
		var ext = null;
		this.checkDataTypeError('string',argu);
		index = argu.lastIndexOf('.');
		if(index !== -1){
			return argu.substr(index+1);
		}
		return ext;
	}

	SA.getFileName = function( argu ){
		var index;
		var ext = null;
		this.checkDataTypeError('string',argu);
		index = argu.lastIndexOf('.');
		if(index !== -1){
			return argu.substr(0,index);
		}
		return ext;	
	}

	SA.text = function( ele , message ){
		var text_content;
		if(ele !== undefined){
			text_content = ele.innerText === undefined ? 'textContent' : 'innerText';
			if(text_content !== undefined && message !== undefined){
				ele[text_content] = message;
			}

			return text_content;
		}
	}

	SA.checkDataTypeError = function( dataType , value ){
		if(this.type(value) !== dataType){  throw new TypeError('arguments\'s datatype is error!  datatype = '+this.type(value)+', I need '+dataType);}

	}

	SA.hasClass = function( ele , class_name ){
		this.checkDataTypeError('string',class_name);
		return ele.className.match(class_name) == null ? false : true;
	}

	SA.addClass = function(ele , class_name ){
		if(!this.hasClass(ele , class_name)){
			ele.className += ' '+class_name;
		}
	}

	SA.removeClass = function(ele , class_name){
		var reg;
		if(this.hasClass(ele , class_name)){
			reg = new RegExp(class_name);
			ele.className = ele.className.replace(reg,'');
		}	
	}

	SA.balabala = function( obj ){
		/*
				obj = {
					'thume' : 'success',
					'direction' : 'top' ,
					'ele' : DOM_NODE ,
					'message' : '' ,
				}

		 */
		var thume , 
		message , 
		direction , 
		ele , 
		top , 
		left , 
		div_ele , 
		index , 
		arrows , 
		i , 
		is_add_balabala_obj = true , 
		balabala_obj_key , 
		animate_time = 500 , 
		is_auto_hidden = true,
		arrows_offset_x = 24;
		arrows_offset_y = 16;

		for(i=0;i<this.balabala_obj.length;i++){
			if(this.isLikeObj(this.balabala_obj[i],obj)){
				is_add_balabala_obj = false;
				balabala_obj_key = i;
			}
		}
		//避免重复出现 所以对接收的参数进行判断 如果无重复的则进行创建
		if(is_add_balabala_obj){
			balabala_obj_key = this.balabala_obj.length; 
			this.balabala_obj[balabala_obj_key] = obj;
		}else{
			return balabala_obj_key;
		}

		console.log(obj['direction'])
		if(obj['ele'] !== undefined){
			top = SA.getElementTop(obj['ele']);
			left = SA.getElementLeft(obj['ele']);
			SA.assert(true,'obj["ele"].offsetTop:'+top)
			SA.assert(true,'obj["ele"].offsetLeft:'+left)
			switch(obj['thume']){
				case 'danger': thume = '-danger';break;
				case 'info': thume = '-info';break;
				case 'success': thume = '-success';break;
				default : thume = '-black';
			}

			switch(obj['direction']){
				case 'bottom': direction = '-bottom';break;
				case 'left': direction = '-left';break;
				case 'right': direction = '-right';break;
				default : direction = '-top';
			}


			div_ele = document.createElement('div');
			div_ele.className = 'balabala';
			div_ele.id = 'balabala-'+balabala_obj_key;
			div_ele.innerHTML = "<div class='balabala-inner"+thume+"'>\r\
								<div class='content'></div>\r\
								<span class='balabala-arrows"+direction+"'></span>\r\
							</div>";

			document.body.appendChild(div_ele);


			SA.text(document.getElementById('balabala-'+balabala_obj_key).getElementsByClassName('content')[0],obj['message']);

			arrows = document.getElementById('balabala-'+balabala_obj_key).getElementsByClassName("balabala-arrows"+direction)[0];
			
			//动态计算要依附于元素的绝对定位
			if(direction === '-bottom'){
				div_ele.style.top = (top-0) + ((obj['ele'].clientHeight-0) + (arrows_offset_y-0)) +'px';
				div_ele.style.left = (left-0) - (arrows_offset_x-0) +'px';
			}else if(direction === '-left'){
				div_ele.style.top = (top-0) - (arrows_offset_y-0) +'px';
				div_ele.style.left = (left-0) - (div_ele.clientWidth + arrows_offset_x*2) +'px';
			}else if(direction === '-right'){
				div_ele.style.top = (top-0) - (arrows_offset_y-0) +'px';
				div_ele.style.left = left + (obj['ele'].clientWidth + arrows_offset_x) +'px';
			}else{
				div_ele.style.top = top - (div_ele.clientHeight + (arrows_offset_y-0)) +'px';
				div_ele.style.left = (left-0) - (arrows_offset_x-0) +'px';
			}
			console.log(direction)
			

			div_ele.style.opacity = 1;
			div_ele.style.transition = 'opacity '+(animate_time/1000)+'s';

			if(obj['hidden'] === true && div_ele.isAnimate === undefined){
				div_ele.isAnimate = 'yes';
				setTimeout(function(){
					div_ele.style.opacity = 0;
					div_ele.style.transition = 'opacity '+(animate_time/1000)+'s';
					setTimeout(function(){
						SA.balabala_obj.splice(balabala_obj_key,1);
						div_ele.parentNode.removeChild(div_ele);
					},animate_time)
						
				} , (obj['keep_time']===undefined?7000:obj['keep_time']));
			}

			return balabala_obj_key;

		}
		
	}

	SA.balabalaOver = function(key , animate_time){
		var obj;
		animate_time = animate_time?animate_time:1000;
		if(this.balabala_obj[key] !== undefined){
			obj = document.getElementById('balabala-'+key);
			if(obj !== null && obj.isAnimate === undefined){
				obj.style.opacity = 0;
				obj.style.transition = 'opacity '+(animate_time/1000)+'s';
				obj.isAnimate = 'yes';
				setTimeout(function(){
					SA.balabala_obj.splice(key,1);
					try{
						obj.parentNode.removeChild(obj);
					}catch(e) {
						console.log(e);
					}
				},animate_time);
			}else{
				if(obj === null){
					SA.balabala_obj.splice(key,1);
				}
			}
				
		}

	}

	SA.assert = function(flag , message){
		var class_name, div_ele, ul_ele, li_ele, index, header_span_ele, div_div_ele;
		
		class_name = flag ? 'Smartahou-right' : 'Smartahou-error';
		if(document.getElementsByClassName('Smartahou-assert').length < 1){
			div_ele = document.createElement('div');
			div_div_ele = document.createElement('div');
			header_span_ele = document.createElement('span');
			ul_ele = document.createElement('ul');
			
			div_ele.className = 'Smartahou-assert';
			div_div_ele.className = 'Smartahou-assert-div';
			ul_ele.className = 'Smartahou-assert-ul';
			header_span_ele.className = 'Smartahou-assert-header-span';
			
			header_span_ele.innerHTML = 'X';

			document.body.appendChild(div_ele);
			div_ele.appendChild(div_div_ele);
			div_ele.appendChild(header_span_ele);
			div_div_ele.appendChild(ul_ele);
			this.init();		//调用了init  用于恢复到最终修改的状态
		}else{
			header_span_ele = document.getElementsByClassName('Smartahou-assert-header-span')[0];
			ul_ele = document.getElementsByClassName('Smartahou-assert-ul')[0];
			div_ele = document.getElementsByClassName('Smartahou-assert')[0];
		}

		div_ele.class_name = 'Smartahou-assert';

		index = document.getElementsByClassName('Smartahou-assert-li').length + 1;

		li_ele = document.createElement('li');
		li_ele.className = 'Smartahou-assert-li '+class_name;
		li_ele.innerHTML = '<span class="Smartahou-li-index">'+index+'</span><span class="Smartahou-li-content-'+index+'"></span>';
		ul_ele.appendChild(li_ele);
		this.text(document.getElementsByClassName('Smartahou-li-content-'+index)[0] , message	);

		li_ele.onmousemove = function(){
			SA.addClass(this,'Smartahou-assert-li-moved');
		}

		li_ele.onmouseout = function(){
			SA.removeClass(this,'Smartahou-assert-li-moved');
		}

		//为头标签绑定鼠标按下事件  用于移动断言贴
		header_span_ele.onmousedown = function(){
			move_obj = div_ele;
			SA.addClass(move_obj,'Smartahou-assert-actived');
		}

		document.body.onmouseup = function(){
			if(move_obj !== null){
				localStorage['end_top'] = move_obj.style.top;
				localStorage['end_left'] = move_obj.style.left;
				localStorage['moved_class_name'] = move_obj.class_name;
				SA.removeClass(move_obj,'Smartahou-assert-actived');
				move_obj = null;
			}
		}

		document.body.onmousemove = function(e){
			if(move_obj !== null){
				if(move_obj.x === undefined && move_obj.y === undefined){
					move_obj.x = (e.pageX - move_obj.offsetLeft);
					move_obj.y = (e.pageY - move_obj.offsetTop);
				}else{
					move_obj.style.left = (e.pageX - move_obj.x)+'px';
					move_obj.style.top = (e.pageY - move_obj.y)+'px';
				}
			}
		}

	}


	SA.getElementLeft = function(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
　　}
　　SA.getElementTop = function(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
　　}
	

	SA.init = function(){
		var obj;
		if(localStorage['moved_class_name'] !== undefined && localStorage['moved_class_name'].length){
			obj = document.getElementsByClassName(localStorage['moved_class_name'])[0];
			obj.style.top = localStorage['end_top'];
			obj.style.left = localStorage['end_left'];
		}
	}

	SA.isLikeObj = function(obj1 , obj2){
		var i , flag = true;
		this.checkDataTypeError('object',obj1);
		this.checkDataTypeError('object',obj2);
		if(obj1.length === obj2.length){
			for(i in obj2){
				if(!obj1.hasOwnProperty(i)){
					flag = false;
				}
			}

			return flag;			
		}
		return false;
	}

}())