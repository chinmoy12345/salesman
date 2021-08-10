import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert  } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pageActivityLoading: true,
			ordersList: [
				
			]
		}
	}


	  async componentDidMount() {
		this.getData();
	  }

	   getData = async () => {
		var self=this;
		const userSessionData = await AsyncStorage.getItem('@userSessionData');
   		let userSesDetails=JSON.parse(userSessionData);
		const params = JSON.stringify({
			"user_id": userSesDetails.id
		});


		axios.post("https://viewongoingprojects.com/jsd-inv/Webeservices/getUserOrder", params,{

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
				self.setState({ ordersList: response.data.data });
				self.setState({pageActivityLoading:false});
			  }
			  else
			  {
				self.setState({pageActivityLoading:false});
			  }
			  
			}).catch(function(error) {
				console.log(error);
			});
	  }

	goToOrderDetails = async (order_id) =>
	{
		
		await AsyncStorage.setItem('@orderSessionData', JSON.stringify(order_id));
		this.props.navigation.navigate('MyOrderStack', { screen: 'MyOrderDetails' })
		
	}

	render() {
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
		});
		
		const {ordersList, pageActivityLoading } = this.state;
		
		return (
			<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
				{pageActivityLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="#42f44b" />
					</View>
				) : (
					<ScrollView>
						
						{ordersList && ordersList.map((item, i) => (
							<View  key={i} style={{flexDirection: 'row', width:"98%", backgroundColor: '#fff', marginBottom: 2, height: 120, paddingLeft:10}}>
							
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									
									<View  style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
								
									    <Text numberOfLines={1} style={{fontSize: 15}}>Date Order: {item.date_time}</Text>
									    <Text numberOfLines={1} style={{fontSize: 15}}>Order No: {item.bill_no}</Text>
										<Text numberOfLines={1} style={{fontSize: 15}}>Customer Name: {item.userName}</Text>
										<Text numberOfLines={1} style={{fontSize: 15}}>Mobile: {item.userPhone}</Text>
										<Text numberOfLines={1} style={{fontSize: 15}}>Total Amount: {item.totalOrderAmountWithCurrency}</Text>
										{/*<Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>${item.qty * item.salePrice}</Text>*/}
										
									</View>
									<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#42f44b', width: 100, height: 25, borderRadius: 5}]} 
							
							onPress={() => this.goToOrderDetails(item.order_id)}
							>
								<Text style={{color: '#ffffff'}}>Details</Text>
							</TouchableOpacity>
									
								</View>
							
							</View>
						))}
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