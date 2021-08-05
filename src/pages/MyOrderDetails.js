import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert  } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default class MyOrderDetails extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pageActivityLoading: true,
			ordersDetails: [
				
			]
		}
	}


	  async componentDidMount() {
		this.getData();
	  }

	   getData = async () => {
		var self=this;
		const userSessionData = await AsyncStorage.getItem('@orderSessionData');
		
		const params = JSON.stringify({
			"order_id": JSON.parse(userSessionData)
		});


		axios.post("https://viewongoingprojects.com/jsd-inv/Webeservices/getOrderDetails", params,{

			"headers": {
			"content-type": "application/json",
			},
			
			})
			.then(function(response) {
			  if(response.data.success==1)
			  {
				
				  //alert(JSON.stringify(response.data.data))
				  //alert("ok..");
				  //alert(JSON.strig);
				self.setState({ ordersDetails: response.data.data });
				self.setState({pageActivityLoading:false});
			  }
			  else
			  {
			
			  }
			  
			}).catch(function(error) {
				console.log(error);
			});
	  }

	

	render() {
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
		});
		
		const {ordersDetails, pageActivityLoading } = this.state;
		
		return (
			<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
				{pageActivityLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="green" />
					</View>
				) : (
					<ScrollView>	


						  <View  style={{flexGrow: 1, flexShrink: 1,backgroundColor: '#fff', alignSelf: 'center'}}>
								
										
								<Text numberOfLines={1} style={{fontSize: 15}}>Customer Name: {ordersDetails.customer_name}</Text>
								<Text numberOfLines={1} style={{fontSize: 15}}>Email: {ordersDetails.customer_email}</Text>
								<Text numberOfLines={1} style={{fontSize: 15}}>Mobile: {ordersDetails.customer_phone}</Text>
								{/*<Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>${item.qty * item.salePrice}</Text>*/}
								
							</View>

						{ordersDetails.items && ordersDetails.items.map((item, i) => (
							<View  key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120, paddingLeft:10}}>
							
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									
									<View  style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
								
										
										<Text numberOfLines={1} style={{fontSize: 15}}>Item Name: {item.item_name}</Text>
										<Text numberOfLines={1} style={{fontSize: 15}}>Qty: {item.qty}</Text>
										<Text numberOfLines={1} style={{fontSize: 15}}>Total Amount: {item.amount}</Text>
										{/*<Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>${item.qty * item.salePrice}</Text>*/}
										
									</View>
									
									
								</View>
							
							</View>
						))}

							<View  style={{flexGrow: 1, flexShrink: 1,backgroundColor: '#fff', alignSelf: 'center'}}>
								<Text numberOfLines={1} style={{fontSize: 15}}>Total Amount: {ordersDetails.net_amount}</Text>
								{/*<Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>${item.qty * item.salePrice}</Text>*/}
								
							</View>
					</ScrollView>
				)}
			</View>
		);
	}
}


const styles = StyleSheet.create({
	input: {
	  height: 40,
	  margin: 12,
	  borderWidth: 1,
	}
  });