import { Picker as RNPicker, Platform } from 'react-native'

import Picker from './src/Picker'

export default ({...props}) => {
    if (Platform.OS === 'android') return <Picker {...props} />
    return <RNPicker {...props} />
}