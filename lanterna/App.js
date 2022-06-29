import React, { useEffect, useState } from "react";
import { View, StyleSheet,Text, TouchableOpacity, Alert} from "react-native";
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';

const App = () =>{
  const [toggle,setToggle] = useState(false);

  const handleChangeToggle = () => setToggle (oldToggle => !oldToggle);
  
  useEffect(()=>{
    //liga flash do celular
    //Alert.alert('Atualizou o componente '+ toggle);
    Torch.switchState(toggle);
    //console.log('Trocou o estado do flash');

  },[toggle]);

  useEffect(()=>{
    /**
     * Quando o celular for chacoalhado o toggle é mudado
     */
    const subscription = RNShake.addListener(()=>{
      setToggle (oldToggle => !oldToggle);
    });
    //desmontagem de componente
    return () => subscription.remove();
  },[]);

  return (
    <View style={toggle ? style.containerLight: style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
         
      <Image 
      style ={toggle ? style.LightOn : style.LightOff} 
      source = {
        toggle 
        ? require('./assets/icones/eco-light.png') : require('./assets/icone/eco-ligth-off.png')
        }
       />
    
    <Image 

      style ={style.dioLogo} 
      source = {
        toggle 
        ? require('./assets/icones/logo-dio-white.png') : require('./assets/icone/logo-dio.png')
        }
      />
</TouchableOpacity>
    </View>

  );

};

export default App;

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
  },
  containerLight:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
  },
LightOn:{
  resizeMode:'contain',
  alignSelf: 'center',
  width: 150,
  height: 150
}
,
LightOff:{
  resizeMode:'contain',
  alignSelf: 'center',
  tintColor: 'white',
  width: 150,
  height: 150
},
dioLogo:{
  resizeMode:'contain',
  alignSelf: 'center',
  
  width: 250,
  height: 250
}

});