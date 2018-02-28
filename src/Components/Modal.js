import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { CSSTransitionGroup } from 'react-transition-group';

class Modal extends Component {

    componentDidMount() {
        //pressing the esc key to dismiss the modal
        window.addEventListener('keyup', this.handleKeyUp, false);
        //tapping in the overlay will close the modal
        document.addEventListener('click', this.handleTap, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyUp, false);
       document.removeEventListener('click', this.handleTap, false);
    }

    handleKeyUp = (event) => {
        const { closeModal } = this.props;
        const key = {
            27: () => {
                event.preventDefault();
                closeModal();
                window.removeEventListener('keyup', this.handleKeyUp, false)
            },
        }
        //now check to see if the right key was presesed
        if (key[event.keyCode]) {
            key[event.keyCode]();
        }
    };

    handleTap = (event) => {
        const { closeModal } = this.props;
        if(this.modal !== null && this.modal !== undefined) {
            if(!this.modal.contains(event.target)) {
                closeModal();
                document.removeEventListener('click', this.handleTap, false);
            }
        }
    }


   
    render() {
        return (
            <CSSTransitionGroup transitionName="Modal" transitionLeaveTimeout={300} transitionEnter={false} transitionEnterTimeout={300} transitionLeaveTimeout={500} transitionLeave={true}>
                <div className={this.props.classes.modalOverlay}>
                    <div className={this.props.classes.modal} ref={component => (this.modal = component)}>
                        <div className={this.props.classes.modalContent}>
                            {this.props.children}
                        </div>
                    </div>
                    <button
                    type="button"
                    className={this.props.classes.closeButton}
                    onClick={this.props.closeModal} />
                </div>
            </CSSTransitionGroup>
        );
    }
}

Modal.propTypes = {
    closeModal: PropTypes.func, 
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    classes: PropTypes.object
}

var styles = {
    // Prevent page scrolling when modal is open
  '@global': {
    'body': {
      overflow: 'hidden',
    },
  },

  // Modal wrapper
  modalOverlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '9999',
    opacity: 1,
    animation: 'show .5s ease',
    overflowX: 'hidden',
    overflowY: 'auto',
  },

  // Fade in open animation
  '@keyframes show': {
    '0%': {
      display: 'none',
      opacity: 0,
    },
    '1%': {
      display: 'flex',
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },

  'leave': {
	opacity: 1,
	transform: 'scaleX(1) translateY(0)'
  },

  'leave-active': {
    opacity: 1,
	transform: 'scaleX(0) translateY(100px)',
	transition: 'all 500ms ease-in-out'
  },

  '@keyframes hide': {
    '0%': {
        display: 'none',
        opacity: 0,
      },
      '1%': {
        display: 'flex',
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
  },

  // Modal itself
  modal: {
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: [0, 0, '0.625rem', 'rgba(0, 0, 0, 0.2)'],

    '@media (min-width: 576px)': {
      width: '32rem',
    },
  },

  // Close button
  closeButton: {
    position: 'fixed',
    top: 0,
    right: 0,
    background: '#fff',
    width: '2.5rem',
    height: '2.5rem',
    padding: 0,
    border: 0,
    cursor: 'pointer',
    outline: 0,
    boxShadow: [0, 0, '0.625rem', 'rgba(0, 0, 0, 0.2)'],

    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '1.2rem',
      left: '0.25rem',
      width: '2rem',
      height: '0.1rem',
      backgroundColor: '#888',
    },

    '&:before': {
      transform: 'rotate(45deg)',
    },

    '&:after': {
      transform: 'rotate(-45deg)',
    },

    '&:hover:before, &:hover:after': {
      backgroundColor: '#444',
    },
  },
}

export default injectSheet(styles)(Modal);