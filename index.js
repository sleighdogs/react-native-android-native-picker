import React from 'react'
import { Picker as RNPicker, Platform , View} from 'react-native'

import Picker from './src/Picker'

const NativeAndroidPicker = ({...props}) => {
    if (Platform.OS === 'android') return <Picker {...props} />

    const { style, items, ...rnPickerProps } = props
    return (
        <View style={style}>
            <RNPicker {...rnPickerProps}>
                { items.map(
                    (item) => (
                        <RNPicker.Item key={item.value} label={item.label} value={item.value} />
                    )
                ) }
            </RNPicker>

            { rnPickerProps.children }
        </View>
    )
}

NativeAndroidPicker.propTypes = {
    ...Picker.propTypes
}

export default NativeAndroidPicker