import React from 'react';
import {connect} from 'react-redux';
import region from 'src/common/region'
import {Select} from 'antd';

const Option=Select.Option;

const wrapper={
    display:'flex',
}


export default class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            provice:"",
            city:"",
            area:"",
            cityArray:[],
            areaArray:[]
        }
    }

    onInputChange=(value,name)=>{
        this.setState({
            [name]:value
        })
        if(name=="provice"){
            this.setState({
                cityArray:region.find(item=>item.name==value).children
            })
        }
        if(name=="city"){
            this.setState({
                areaArray:this.state.cityArray.find(item=>item.name==value).children
            })
        }
    }

    getData(){
        let {provice,city,area}=this.state;
        return provice+city+area;
    }

    render() {
        let {provice,city,area,cityArray,areaArray}=this.state;
        return <div style={wrapper}>
        <Select defaultValue={provice} value={provice} onSelect={(value) => { this.onInputChange({ target: { value } }, "provice") }} style={{ width: 120 }}>
            { region.map(item => { return <Option value={item.name}>{item.name}</Option> }) }
        </Select>
        <Select defaultValue={city} value={city} onSelect={(value) => { this.onInputChange({ target: { value } }, "city") }} style={{ width: 120 }}>
            { this.state.citys.map(item => { return <Option value={item.name}>{item.name}</Option> }) }
        </Select>
        <Select defaultValue={area} value={area} onSelect={(value) => { this.onInputChange({ target: { value } }, "area") }} style={{ width: 120 }}>
            { this.state.areas.map(item => { return <Option value={item.name}>{item.name}</Option> }) }
        </Select>
        </div>
    }
}
