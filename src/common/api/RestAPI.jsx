import wish,{ debounce }  from 'src/common/wish'

let modules={};
let options={
    baseUrl:'/api'
};

function format({path=[],query={}}){
    let url='';
    let params=[];
    path.map(item=>{
        url+='/'+item;
    })
    for(let p in query){
        params.push(p+'='+query[p])
    }
    return url+"?"+params.join('&');
}

class Module {

    constructor(props){
        this.$name=props.name;
        this.$parent=props.parent;
        this.$options=Object.assign({},options,props.options);
    }

    child(name,options){
        let _self=this;
        if(typeof name ==='string'){
            _self[name]=new Module({name:name,parent:_self,options});
        }else if(Array.isArray(name)){
            name.map(item=>{
                _self[item]=new Module({name:name,parent:_self,options});
            })
        }
    }

    parse(config,method){
        let result=[];
        const loop=(module)=>{
            result.push(module.$name);
            if(module.$parent){
                loop(module.$parent)
            }
        }
        loop(this);
        result.push('');
        return {
            url:result.reverse().join('/')+format(config),
            body:config.body,
            method:method
        }
    }

    to(config,type){
        let data=this.parse(config,type);
        return wish.fetch({
            urlString:this.$options.baseUrl+data.url,
            body:data.body||null
        },data.method)
    }

    toResult(config,type,dataType){
        let data=this.parse(config,type);
        return wish.fetch({
            urlString:this.$options.baseUrl+data.url,
            body:data.body||null
        },data.method).then(res=>{
            if(res.code=='success'){
                return res.data
            }else{
                return dataType
            }
        })
    }

    create(config={}){
        if(typeof config.dataType !== 'undefined'){
            return this.toResult(config,'POST',config.dataType)
        }
        return this.to(config,'POST')
    }
    update(config={}){
        if(typeof config.dataType !== 'undefined'){
            return this.toResult(config,'PUT',config.dataType)
        }
        return this.to(config,'PUT')
    }

    query(config={}){
        if(typeof config.dataType !== 'undefined'){
            return this.toResult(config,'GET',config.dataType)
        }
        return this.to(config,'GET')
    }
    remove(config){
        if(typeof config.dataType !== 'undefined'){
            return this.toResult(config,'DELETE',config.dataType)
        }
        return this.to(config,'DELETE')
    }
}


export const Rest=modules;
export default {
    info(params){
        options=params;
    },
    define(name,options){
        if(typeof name ==='string'){
            let module=new Module({name:name,parent:null,options});
            modules[name]=module;
        }else if(Array.isArray(name)){
            name.map(item=>{
                let module=new Module({name:item,parent:null,options});
                modules[item]=module;
                return module;
            })
        }
    }
}
