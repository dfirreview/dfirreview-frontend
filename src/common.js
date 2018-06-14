import React from 'react';
import PropTypes from 'prop-types'

class S extends React.Component {
    render() {
        return <span className='sentence'>{this.props.children}&ensp;</span>
    }
}

S.propTypes = {
    children: PropTypes.string,
}

export default S;