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
};
