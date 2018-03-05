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

        this.labels = getLabels(this.props.items)
        this.values = getValues(this.props.items)
    }

    onPress = () => {
        NativeModules.NativeAndroidPicker
            .showPickerDialog(
                this.props.prompt || '',
                this.labels
            )
            .then(
                (index) => {
                    const value = this.values[index]
                    if (this.props.selectedValue !== value) {
                        this.props.onValueChange(value, index)
                    }
                }
            )
            .catch(
                (error) => {
                    //dialog closed
                }
            )
    }

    render() {
        return (
            <TouchableNativeFeedback
                underlayColor={this.props.underlayColor}
                style={this.props.wrapperStyle}
                onPress={this.onPress}>

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
    wrapperStyle: PropTypes.object
};

Picker.defaultProps = {
    selectedValue: null,
    prompt: null,
    underlayColor: 'transparent',
    wrapperStyle: {}
}

export default Picker