const ValidConfig={
        required:{
			regex:/\S/,
			message:"为必填项"
		},
        positive:{
            regex:/^[1-9]\d*\.{0,1}\d*$/,
            message:'为一个大于0的数字'
        }
    };

export default {
    parseTime: function(time){
        // 2019-05-03T07:41:32.36Z
        if(!time){
           return {
            day: '',
            hour:''
           }
        }
        let arr = time.split('T')
        return {
          day: arr[0],
          hour: arr[1].slice(0,5)
        }
    },
    trim:function(x=''){
        return x.replace(/^\s+|\s+$/gm,'');
    },
    remove:function(x='',string=''){
        return x.replace(new RegExp(string,'g'),'');
    },
    /**
     * [description]
     * @param  {[type]} data       [description]
     * @param  {[type]} expression {filedName:{filter:[过滤条件],name:'字段显示文本'}}
     * @return {[type]}            [description]
     */
	isValid:function(data,expression){
        let _tempValue="";
        let _message=[];
        let result={
			flag:true,
            name:'',
			message:''
		};

        for(let p in expression){
            if(result.flag){
                let filedName=p;
                let filedOpts=expression[filedName]||{};
                let {filters=[],name='',...rest}=filedOpts;
                _tempValue=data[filedName]||'';
                if(rest.isTrim){
                    _tempValue=this.trim(data[filedName]);
                }
                if(rest.isRemove){
                    _tempValue=this.remove(_tempValue,rest.isRemove);
                }
                filters.map(item=>{
    				let {regex,message}=ValidConfig[item];
                    if(!(regex.test(_tempValue))){
                        _message.push(message);
                        result={
                            name:name,
    						flag:false,
    						message:_message
    					};
                    }
                })
            }
        }
        return result;
    },
	asyn(type){
		return `FETCH_${type}`
	},
	sync(type){
		return `LOCAL_${type}`
	},
	isAsyn(type){
		return type.indexOf("FETCH_") == 0
	},
	isSync(type){
		return type.indexOf("LOCAL_") == 0
	},
	success(type){
		return `FETCH_${type}_SUCCESS`
	},
	failure(type){
		return `FETCH_${type}_FAILURE`
	},
	result(res){
		if(res.code=="success"){
			return res.data
		}else{
			return false
		}
	},
	isObject(obj) {
        return  Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase()=== "object";
    },
	testArray(data){
        return Array.isArray(data)?data:[]
    },
	testObj(data){
		return this.isObject(data)?data:{}
	}

}
