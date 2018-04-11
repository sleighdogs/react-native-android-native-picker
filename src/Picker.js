import React from 'react'
import PropTypes from 'prop-types'
import { NativeModules, View, Text, TouchableNativeFeedback } from 'react-native'

const getLabels = (items) => {
    return items.map(
        (item) => {
            return item.label
        }
    )
}

const getValues = (items) => {
    return items.map(
        (item) => {
            return item.value
        }
    )
}

class Picker extends React.Component {
    constructor(props) {
        super(props)
    }

    onPress = () => {
		if (this.props.onOpen) this.props.onOpen()

        NativeModules.NativeAndroidPicker
            .showPickerDialog(
                this.props.prompt || '',
                getLabels(this.props.items)
            )
            .then(
                (index) => {
                    const value = getValues(this.props.items)[index]
                    if (this.props.selectedValue !== value) {
                        this.props.onValueChange(value, index)
                    }
					
					if (this.props.onClose) this.props.onClose(value)
                }
            )
            .catch(
                (error) => {
                    //dialog closed
					if (this.props.onClose) this.props.onClose()
                }
            )
    }

    render() {
        const touchableProps = {
            underlayColor: this.props.underlayColor,
            style: this.props.wrapperStyle,
            onPress: this.onPress
        }

        if (this.props.touchableBackground) {
            touchableProps.background = this.props.touchableBackground
        }

        return (
            <TouchableNativeFeedback {...touchableProps}>

                { React.Children.only(this.props.children) }

            </TouchableNativeFeedback>
        )
    }
}

Picker.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    onValueChange: PropTypes.func.isRequired,
    selectedValue: PropTypes.string,
    prompt: PropTypes.string,
    underlayColor: PropTypes.string,
    wrapperStyle: PropTypes.object,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
    touchableBackground: PropTypes.any
};

Picker.defaultProps = {
    selectedValue: null,
    prompt: null,
    underlayColor: 'transparent',
    wrapperStyle: {},
	onOpen: null,
	onClose: null,
    touchableBackground: null
}

export default Picker