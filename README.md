# react-native-android-native-picker
> React Native package to work around inconsistency issues with 'onValueChange()' on Android react native picker.

## Installation
Since we are not in NPM registry you have to install this package via git.

```bash
yarn add https://github.com/sleighdogs/react-native-android-native-picker.git#master
```

### Android Setup

Since this package contains a bit of native code you have to link it with react native.
```bash
react-native link react-native-fixed-android-picker
```

In case you are receiving error about missing package, check `android/app/build.gradle` and make sure that you have following line in your dependencies:

```
compile project(':react-native-android-native-picker')
```

### iOS Setup
Luckily iOS does not suffer from same issues as Android RN picker, so internally we revert to using default Picker from `react-native` and pass all props to it.

## Usage

### Props

|Prop|Type|Description|Required|Default|
|---|---|---|---|---|
|**`items`**|array|array of `{value: 'foo', label: 'bar'}` objects|yes|-|
|**`onValueChange`**|function|function that will be called each time new option is selected|yes|-|
|**`selectedValue`**|string|current value of picker (useful for selectboxes)|no|`null`|
|**`prompt`**|string|dialog title|no|`null`|
|**`underlayColor`**|string|underlay color used for wrapper `TouchableNativeFeedback`|no|`transparent`|
|**`wrapperStyle`**|object|additional styling applied to wrapper `TouchableNativeFeedback`|no|`{}`|

### Styling
This picker is built to be as little intrusive as possible - any child that is inside it will displayed without the need to pass any styling. If you wish to apply some styling to wrapping `TouchableNativeFeedback` component, check props `wrapperStyle` and `underlayColor`.

### Example
```js
import Picker from 'react-native-android-native-picker'
 
class SelectExample extends Component {
  constructor(props) {
    super(props)
	
    this.state = {
      value: null
    }
	
    this.title = 'My options'
    this.options = [
      {value:'foo',label:'Foo'},
      {value:'bar',label:'Bar'}
    ]
  }
  
  render() {
    return (
      <AndroidPicker
          prompt={this.title}
          selectedValue={this.state.value}
          onValueChange={(newValue, newIndex) => this.setState({value: newValue})}
          items={this.options}>

          <View><Text><Text style={{'fontWeight':'bold'}}>Selected value:</Text> {this.state.value}</Text></View>

      </AndroidPicker>
    )
  }
}
 
export default SelectExample
```

