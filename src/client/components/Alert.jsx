import PropTypes from 'prop-types';

const Alert = (props) => {
    return (

        <>
            <div className="card border-warning">
                <h4 className="card-header">{props.title}</h4>
                <div className="card-body">
                    <p className="card-text">{props.content}</p>
                </div>
            </div>
        </>
    )
}

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

export default Alert;