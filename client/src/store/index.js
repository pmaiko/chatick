import addToken from "./actions";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        ...state
    }
};

const mapDispatchToProps = {
    ...addToken,
};

export const store = (component) => {
    return connect(mapStateToProps, mapDispatchToProps)(component);
};
