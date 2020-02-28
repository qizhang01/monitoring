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
        border: '1px solid rgb(44, 131, 221)'
    },
    panelHeader:{
        height:40,
    },
    panelBody:{
        flexGrow:1
    },
}

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {title}=this.props;
        return (
            <div className="mime-panel" style={style.panel}>
                <div className="image-border image-border1"></div>
                <div className="image-border image-border2"></div>
                <div className="image-border image-border3"></div>
                <div className="image-border image-border4"></div>
                { title && (
                    <div style={style.panelHeader}>
                        <span style={{fontSize:16, fontWeight:'blod'}}>{title}</span>               
                    </div>)
                }     
                <div>
                    {this.props.children}
                </div>
            </div>)
    }

}
