import wish,{ debounce }  from 'src/common/wish'
import ProjectAction from 'src/router/project/actions'

import {pre} from './index'

export default {

    method(name){
        if(/^CREATE/.test(name)){
            return wish.POST
        }else if(/^UPDATE/.test(name)){
            return wish.PUT
        }else if(/^DELETE/.test(name)){
            return wish.DELETE
        }else{
            return wish.GET
        }
    },

    fetch(name,params){
        let method=this.method(name);
        return wish.fetch({
            name,
            ...params
        },method)
    },

    query(url,params){
        return wish.fetch({
            urlString:pre+url,
            ...params
        },wish.GET)
    },

    post(url,params){
        return wish.fetch({
            urlString:pre+url,
            ...params
        },wish.POST)
    },

    loadProjectList(){

    },

    loadProjectDetailByProjectId(projectId){
        return this.fetch(ProjectAction.QUERY_PROJECT_DETAIL,{path:{id:projectId}})
    },

    updateProjectByProjectId(projectId,data){
        return this.fetch(ProjectAction.UPDATE_PROJECT,{path:{projectId},body:data})
    },





    /*项目户型*/
    loadHouseTypeByProjectId(projectId){
        return this.fetch(ProjectAction.QUERY_HOUSETYPE,{path:{id:projectId}})
    },

    /*平面方案*/
    loadPlaneByHouseTypeId(houseTypeId){
        return this.fetch(ProjectAction.QUERY_PLANE,{path:{houseTypeId}})
    },

    /*查询风格色系*/
    loadStyleColorByPlaneId(planeId){
        return this.fetch(ProjectAction.QUERY_COLOR,{path:{planeId}})
    },

    loadChangeHouseTypeByHouseTypeId(parentHouseTypeId){
        return this.fetch(ProjectAction.QUERY_CHANGE_HOUSETYPE,{path:{parentHouseTypeId}})
    },

    /*查询基础户型下的变异户型*/
    loadChangeHouseTypeByHouseType(houseType){
        return this.loadChangeHouseTypeByHouseTypeId(houseType.houseTypeId).then(res=>{
            let result={ value:houseType.houseTypeId, label :houseType.name, type:"stand" },
                children=(res.data||[]).map(item=>{ return { value:item.id, label:item.name } });
            if(children && children.length>0){
                result.children=children;
            }
            return [result]
        })
    },
}
