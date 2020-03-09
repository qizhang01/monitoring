/**
 * 项目库 Container业务入口组件
 * @type {String}
 */

import React from 'react';


const style={
    panel:{
        minHeight:100,
        minWidth:100,
        alignItems:'stretch',
        background:'#FFF',
        padding:'10px 20px 20px 20px',
        position: 'relative',
        backgroundColor: '#09163A',
        border: '1px solid rgba(26, 63, 114, 1)'
    },
    panelHeader:{
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        justifyContent:'space-between'
    },

    verticalBar:{
        display:'inline-block',
        width:'2px',
        height:'20px',
        backgroundColor: '#08D7ED',
        borderRadius:'1px',
        marginRight: '15px'
    }
}
const SchematicItem = (props)=>{
    const {text, color} = props
    const stl = {
        display:'inline-block',
        height: 10,
        width: 10,
        backgroundColor: color,
        marginRight: 10,
    }
    return (
        <span>
            <span style={stl}></span>
            <span style={{color: '#7CA1D2',marginRight: 10}}>{text}</span>
        </span>
    )
}

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {title,schematic}=this.props;
        return (
            <div className="mime-panel" style={style.panel}>
                <div className="image-border image-border1"></div>
                <div className="image-border image-border2"></div>
                <div className="image-border image-border3"></div>
                <div className="image-border image-border4"></div>
                { title && (
                    <div style={style.panelHeader}>
                        <span style={{display:'inline-block',alignItems:'center',display:'flex'}}>
                            <span style={style.verticalBar}></span>
                            <span style={{fontSize: 16, fontWeight:'blod',color: '#8EC7DC'}}>{title}</span>
                        </span>
                        { schematic && <span style={{display:'inline-block'}}>
                                <SchematicItem text='正常' color='#35D0E9'></SchematicItem>
                                <SchematicItem text='异常' color='#F90BFD'></SchematicItem>
                            </span>
                        }              
                    </div>)
                }     
                <div>
                    {this.props.children}
                </div>
            </div>)
    }

}
