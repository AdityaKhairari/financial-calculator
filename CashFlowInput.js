import React, {useState} from 'react'
import { View , Text, TextInput} from 'react-native'

export default function CashFlowInput(props) {
    const [text, setText] = useState('');
    return (
        <View style={{flexDirection: "row", margin: 5}}>
            <Text style={{fontSize: 20}}>{props.title} </Text>
            <TextInput
                style={{fontSize: 20}}
                placeholder={props.placeholder}
                onChangeText={text => setText(text)}
                defaultValue={text}
                multiline={false}
                maxLength={15}
            />
        </View>
    )
}

