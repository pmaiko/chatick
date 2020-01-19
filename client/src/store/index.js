import actions from "./actions";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        ...state
    }
};

const mapDispatchToProps = {
    ...actions,
};

export const store = (component) => {
    return connect(mapStateToProps, mapDispatchToProps)(component);
};
