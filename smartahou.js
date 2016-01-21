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

	SA.balabala = function(message , theme){
		
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
	

	SA.init = function(){
		var obj;
		if(localStorage['moved_class_name'] !== undefined && localStorage['moved_class_name'].length){
			obj = document.getElementsByClassName(localStorage['moved_class_name'])[0];
			obj.style.top = localStorage['end_top'];
			obj.style.left = localStorage['end_left'];
		}
	}

}())