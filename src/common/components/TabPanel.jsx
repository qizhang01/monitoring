import React from 'react';

export default class TabPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentActiveIndex: 0
        }
    }
    changeTab(currentActiveIndex){
        this.setState({
            currentActiveIndex
        })
    }
    render() {
        let {currentActiveIndex} = this.state;
        let {tabs=[],children,style={}}=this.props;
        return (<div className="mime-tab" style={style}>
            <div className="mime-tab-header">
                {
                    React.Children.map(children,(item, index) => {
                        let {title}=item.props;
                        return <div onClick={()=>{this.changeTab(index)}} className={"mime-tab-header-item" + ( index == currentActiveIndex ? " active" : "")}>
                            <span>{title}</span>
                        </div>
                    })
                }
            </div>
            <div className="mime-tab-content">
                {
                    React.Children.map(children,(item, index) => {
                        return index == currentActiveIndex?item:null
                    })
                }
            </div>
        </div>)
    }
}

// return <div className={"mime-tab-content-item" + ( index == currentActiveIndex ? " active" : "")}>
//     {item}
// </div>
