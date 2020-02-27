/**
 * 项目库 Container业务入口组件
 * @type {String}
 */

import React from 'react';

import {Tabs} from 'antd'

const TabPane = Tabs.Pane;

const style = {
    wrap: {
        minHeight: 100,
        minWidth: 100,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'stretch',
        background: '#FFF'
    },
    header: {
        height: 40,
        flexShrink: 0,
        borderBottom: '1px solid #eee'
    },
    body: {
        padding: '10px 20px 20px 20px',
        flexGrow: 1
    }
}

export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultKey: 1,
            config: [
                {
                    title: ""
                }
            ]
        }
    }
    render() {
        const {config} = this.props;
        return <div className="mime-tab" style={style.wrap}>
            <div className="mime-tab-header" style={style.header}>
                <Tabs defaultActiveKey="1">
                    {
                        config.map((item, index) => {
                            return <TabPane tab={item.title} key={index + 1}></TabPane>
                        })
                    }
                </Tabs>
            </div>
            <div className="mime-tab-body" style={style.header}>
                {this.props.children}
            </div>
        </div>
    }

}
