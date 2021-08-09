import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert  } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default class CustomerList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pageActivityLoading: true,
			customerList: [
				
			],
			customerFilter:[
				
			]
		}
	}

	  async componentDidMount() {
		this.getData();
	  }

	   getData = async () => {
		var self=this;
		const params = JSON.stringify({
			"user_id": '1'
		});


		axios.post("https://viewongoingprojects.com/jsd-inv/Webeservices/getCustomerList", params,{

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
				self.setState({ customerList: response.data.data });
				self.setState({ customerFilter: response.data.data });
				self.setState({pageActivityLoading:false});
			  }
			  else
			  {
			
			  }
			  
			}).catch(function(error) {
				console.log(error);
			});
	  }

	  
	searchCustomer(textToSearch)
	{
		//alert(textToSearch);
		this.setState({
			customerFilter:this.state.customerList.filter(i=>
				i.customer_name.toLowerCase().includes(textToSearch.toLowerCase()),
			),
		});
	}

	goToChheckout = async (items) =>
	{
		//alert(JSON.stringify(items));
		
		await AsyncStorage.setItem('@existingCustomerId', JSON.stringify(items));
		this.props.navigation.navigate('HomeStack', { screen: 'Customer' });
		
	} 

	render() {
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
		});
		
		const {customerFilter, pageActivityLoading } = this.state;
		
		return (
			<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
				<View style={[styles.centerElement, {height: 50}]}>
						
					
						<TextInput 
										style={{backgroundColor: '#f0f0f0',borderColor: '#42f44b',borderWidth: 1,width:"100%", height: 50, borderRadius: 4}} 
										placeholder="Search Customer" 
										
										onChangeText={text=>{this.searchCustomer(text)}}
										
									/> 
					
					</View>
				{pageActivityLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="green" />
					</View>
				) : (
					<ScrollView>	
						{customerFilter && customerFilter.map((item, i) => (
							<View  key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120, paddingLeft:10}}>
							
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									
									<View  style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
								
										
										<Text numberOfLines={1} style={{fontSize: 15}}>Customer Name: {item.customer_name}</Text>
										<Text numberOfLines={1} style={{fontSize: 15}}>Mobile: {item.customer_phone}</Text>
										<Text numberOfLines={1} style={{fontSize: 15}}>Pincode: {item.customer_pincode}</Text>
										{/*<Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>${item.qty * item.salePrice}</Text>*/}
										
									</View>
									<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#42f44b', width: 100, height: 25, borderRadius: 5}]} 
							
							onPress={() => this.goToChheckout(item)}
							>
								<Text style={{color: '#ffffff'}}>Select</Text>
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