import React from 'react';

export const connect = (store, mapStateToProps, Component) => {
    return class extends React.Component {
        getInitialState() {
            const state = store.getState();
            return {state};
        }

        componentWillMount() {
            store.listen(state => this.setState({state}));
        }
        render() {
            const stateProps = mapStateToProps(this.state);
            const passedProps = this.props;
            const props = Object.assign({}, stateProps, passedProps);
            return <Component {...props} />
        }
    }
}