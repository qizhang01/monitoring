import React from 'react';

export function myModal(WrappedComponent) {
    return class WrappingComponent extends React.Component {
        render() {
            return <WrappedComponent cancelText="取消" okText="确认" width={700} maskClosable={false} {...this.props}></WrappedComponent>
        }
    }
}

export function formModal(WrappedComponent) {
    return class WrappingComponent extends React.Component {
        state = {
            visible: this.props.visible
        }
        componentWillReceiveProps(newProps) {
            if (newProps.visible != this.state.visible) {
                this.setState({visible: newProps.visible})
            }
        }

        close() {
            this.setState({visible: false})
        }

        onCancel = () => {
            this.props.onCancel && this.props.onCancel();
            this.close();
        }

        onOk = () => {
            const {onOk} = this.props;
            if (onOk) {
                onOk().then(res => {
                    if (res) {
                        this.close();
                    }
                })
            }
        }

        render() {
            let { visible, onCancel, onOk, ...rest } = this.props;
            return <WrappedComponent visible={this.state.visible} onCancel={this.onCancel} onOk={this.onOk} cancelText="取消" okText="确认" width={700} maskClosable={false} {...rest}></WrappedComponent>
        }
    }
}
