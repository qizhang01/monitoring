/**
 * 项目库 Container业务入口组件
 * @type {String}
 */

import React from 'react';


const style={
    panel:{
        minHeight:100,
        minWidth:100,
        display:'flex',
        flexFlow:'column',
        alignItems:'stretch',
        background:'#FFF',
        padding:'10px 20px 10px 20px'
    },
    panelHeader:{
        height:40,
        flexShrink:0,
        borderBottom:'1px solid #eee',
        display:'flex'
    },
    panelBody:{
        flexGrow:1
    },
    title:{
        display:'flex',
        alignItems:'center'
    }
}

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {title,tools,icon,children,btns=null,wrapper={},bodyStyle={}}=this.props;
        let _panelStyle=Object.assign({},style.panel,wrapper);
        let _bodyStyle=Object.assign({},style.panelBody,bodyStyle);
        return <div className="mime-panel" style={_panelStyle}>
            <div style={style.panelHeader}>
                <div style={style.title}>
                    <span style={{fontSize:16,fontWeight:'blod'}}>{title}</span>
                    <span style={{cursor:'pointer',color:'#39f',marginLeft:20}}>{icon}</span>
                </div>
                <div style={{marginLeft:80,flexGrow:1}}>
                    {tools}
                </div>
                <div style={{width:120}}>
                    {btns}
                </div>
            </div>
            <div style={_bodyStyle}>
                {this.props.children}
            </div>
        </div>
    }

}
