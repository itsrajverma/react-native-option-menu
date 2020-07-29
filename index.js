import React,{useState,useRef} from "react";
import {
  Platform,
  ActionSheetIOS,
  UIManager,
  findNodeHandle,
  View,
  TouchableOpacity,
  Image,
  Text
} from "react-native";

const OptionMenu = (props) =>{
    const inputRef = useRef();
    const [open,setOpen] = useState(false);


    const handleClick = index => {
        let options = props.options;
        for (var i = 0; i < options.length; i++) {
            if (index === i) {
              if (index === options.length - 1) {
                const open = false;
                setOpen(open);
              } else {
                if (props.actions[i] !== null) {
                  props.actions[i]();
                }
              }
            }
          }
    }

    const handlePressWeb = () => {
        setOpen(true);
    };

    const handlePress = () => {
        let options = props.options;
        if (Platform.OS === "ios") {
          let destructiveIndex = -1;
          if (
            Number.isInteger(props.destructiveIndex) &&
            props.destructiveIndex >= 0
          ) {
            destructiveIndex = props.destructiveIndex;
          }
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options: options,
              destructiveButtonIndex: destructiveIndex,
              cancelButtonIndex: options.length - 1
            },
            buttonIndex => {
              handleClick(buttonIndex);
            }
          );
        } else if (Platform.OS === "android") {

          UIManager.showPopupMenu(
            findNodeHandle(inputRef.current),
            options,
            () => console.log("something went wrong with the popup menu"),
            (e, i) => {
              handleClick(i);
            }
          );
        }
    };


   let options =  open ? (
        <View
        style={{
          position: "absolute",
          bottom: "100%",
          right: "50%",
          flex: 1,
          elevation: 3,
          shadowColor: "black",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          borderRadius: 5,
          backgroundColor: "white"
        }}
      >
      { props.options.map((option, index) => {
        return (
          <View key={option}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => handleClick(index)}
            >
              <Text style={{ textAlign: "center" }}>{option}</Text>
            </TouchableOpacity>

            {index < props.options.length - 1 && (
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "lightgray"
                }}
              />
            )}
          </View>
        );
      })}
    </View>) : null;

    let component = props.button ? (
        <Image source={props.button} style={props.buttonStyle} />
    ) : (
        props.customButton
    );
    if (Platform.OS === "web") {
        return (
        <View>
            <View>
            <TouchableOpacity ref={ inputRef } onPress={handlePressWeb}>
                {component}
            </TouchableOpacity>
            </View>
            {options}
        </View>
        );
    } else {
        return (
        <View>
            <TouchableOpacity ref={ inputRef } onPress={handlePress}>
            {component}
            </TouchableOpacity>
        </View>
        );
    }

}

export default OptionMenu;
