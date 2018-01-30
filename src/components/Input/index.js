import React from "react";
import { View, TextInput } from "react-native";
import { Icon } from "native-base";

const VxrInput = ({
  iconName,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style
}) => {
  return (
    <View style={[styles.containerStyle, style]}>
      {iconName && <Icon name={iconName} style={styles.iconStyle} />}
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputStyle]}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5
  },
  iconStyle: {
    color: "#9b9eab",
    fontSize: 22
  },
  containerStyle: {
    height: 46,
    // paddingLeft: 10,
    // paddingRight: 10,
    // backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 2
  }
};

export { VxrInput };
