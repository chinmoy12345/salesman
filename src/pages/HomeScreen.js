import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert  } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectAll: false,
			cartItemsIsLoading: true,
			cartItems: [
				
			],
			productFilter: [
				
			],
			cartProducts: [],
			apiFetchProduct: []
		}
	}


	 


	 async componentDidMount() {
		let unsubscribe = this.props.navigation.addListener('focus', () => {
			//alert("ok..");
			this.getData();
			/// Do whatever you want
		  });
		  unsubscribe;
		
		if(unsubscribe)
		{
			this.getData();
		}
		
	  }

	  getData = async () => {
		let reps=await axios.get("https://viewongoingprojects.com/jsd-inv/Webeservices/fetchProductData");
		
		this.setState({ cartItems: reps.data.data });
		this.setState({ productFilter: reps.data.data });
		this.setState({ cartItemsIsLoading:false });
		
	  }


	
	 
	selectHandler = (index, value) => {
		//const newItems = [...this.state.cartItems]; // clone the array 
		//newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 

		//this.setState({ cartItems: newItems }); // set new state


		const productFilterItem = [...this.state.productFilter]; // clone the array 
		productFilterItem[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
		this.setState({ productFilter: productFilterItem }); // set new state
	}
	
	selectHandlerAll = (value) => {
		const newItems = [...this.state.cartItems]; // clone the array 
		newItems.map((item, index) => {
			newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
		});
		this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
	}
	
	deleteHandler = (index) => {
		Alert.alert(
			'Are you sure you want to delete this item from your cart?',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: () => {
					let updatedCart = this.state.cartItems; /* Clone it first */
					updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
					this.setState(updatedCart); /* Update the state */
				}},
			],
			{ cancelable: false }
		);
	}
	
	quantityHandler = (action, index) => {
		//const newItems = [...this.state.cartItems]; // clone the array 
		//let currentQty = newItems[index]['qty'];
		//if(action == 'more'){
		///	newItems[index]['qty'] = currentQty + 1;
		//} else if(action == 'less'){
		//	newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1;
		//}
	//	this.setState({ cartItems: newItems }); // set new state






		const productFilterIttms = [...this.state.productFilter]; // clone the array 
		let currentQtyPf = productFilterIttms[index]['qty'];
		if(action == 'more'){
			productFilterIttms[index]['qty'] = currentQtyPf + 1;
		} else if(action == 'less'){
			productFilterIttms[index]['qty'] = currentQtyPf > 1 ? currentQtyPf - 1 : 1;
		}

		if(productFilterIttms[index]['qtySet'].length>0)
		{
			let i=0;
			let lowestQty=0;
			for(i;i<productFilterIttms[index]['qtySet'].length;i++)
			{
				//alert(productFilterIttms[index]['qtySet'][i])
				if(productFilterIttms[index]['qtySet'][i]<=productFilterIttms[index]['qty'])
				{
					lowestQty=productFilterIttms[index]['qtySet'][i];
				}
			}
			if(lowestQty)
			{
				//alert(productFilterIttms[index]['qtyPriceSet'][lowestQty]);
				productFilterIttms[index]['salePrice'] = productFilterIttms[index]['qtyPriceSet'][lowestQty];
			}
			else
			{
				productFilterIttms[index]['salePrice'] = productFilterIttms[index]['duPrice'];
			}
		}
		this.setState({ productFilter: productFilterIttms }); // set new state




	}
	
	subtotalPrice = () => {
		const { cartItems } = this.state;
		if(cartItems){
			return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.salePrice : 0), 0 );
		}
		return 0;
	}

	searchProduct(textToSearch)
	{
		//alert(textToSearch);
		this.setState({
			productFilter:this.state.cartItems.filter(i=>
				i.name.toLowerCase().includes(textToSearch.toLowerCase()),
			),
		});
	}

	goToCart = async () =>
	{
		const productsCartData = this.state.cartItems.filter(function (items) {
			return items.checked === 1;
		}).map(function (items) {
			return items;
		})
		//alert(JSON.stringify(productsCartData));


		let productsSes=await AsyncStorage.setItem('@productSessionData', JSON.stringify(this.state.cartItems));

		let cartItemSes=await AsyncStorage.setItem('@cartSessionData', JSON.stringify(productsCartData));
		console.log(cartItemSes);
		console.log(productsSes);
		//window.localStorage.setItem("cartSessionData", JSON.stringify(productsCartData)); 

		//AsyncStorage.setItem(      '@MySuperStore:key',      'I like to save it.'    );
		if(productsCartData.length>0)
		{
			this.props.navigation.navigate('HomeStack', { screen: 'Cart' })
		}
		else{
			alert("Please add some product.");
		}
		
	}

	  goToCartf = async () => {
		try {
		  await AsyncStorage.setItem('@storage_Key', value)
		} catch (e) {
		  // saving error
		}
	  }

	render() {
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
		});
		
		const { cartItems,productFilter, cartItemsIsLoading, selectAll } = this.state;
		
		return (
			<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
				<View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10}}>
					<View style={[styles.centerElement, {width: 50, height: 50}]}>
						<Ionicons name="ios-cart" size={25} color="#000" />
					</View>
					<View style={[styles.centerElement, {height: 50}]}>
						
					
						<TextInput 
										style={{backgroundColor: '#f0f0f0',width:270, height: 25, borderRadius: 4}} 
										placeholder="Search Product" 
										onChangeText={text=>{this.searchProduct(text)}}
										
										
									/> 
					
					</View>
				</View>

				
				
				
				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (
					<ScrollView>	
						{productFilter && productFilter.map((item, i) => (
							<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandler(i, item.checked)}>
										<Ionicons name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "#42f44b" : "#42f44b"} />
									</TouchableOpacity>
								</View>
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/}} style={{paddingRight: 10}}>
										<Image source={{uri: item.thumbnailImage}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
									</TouchableOpacity>
									<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
										<Text numberOfLines={1} style={{fontSize: 15}}>{item.name}</Text>
										<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.color ? 'Variation: ' + item.color : ''}</Text>

										<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.option ? 'Option: ' + item.option : ''}</Text>

										
                   
				   
				    <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>${item.qty * item.salePrice}</Text>
										<View style={{flexDirection: 'row'}}>
											<TouchableOpacity onPress={() => this.quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="remove" size={22} color="#cccccc" />
											</TouchableOpacity>
											<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.qty}</Text>
											<TouchableOpacity onPress={() => this.quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="add" size={22} color="#cccccc" />
											</TouchableOpacity>
										</View>
									</View>
									
								</View>
								{/*<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.deleteHandler(i)}>
										<Ionicons name="md-trash" size={25} color="#ee4d2d" />
						</TouchableOpacity> 
								</View>*/}
							</View>
						))}
					</ScrollView>
				)}
				
				{!cartItemsIsLoading &&
					<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
						{/*<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<View style={[styles.centerElement, {width: 32, height: 32}]}>
									<MaterialCommunityIcons name="ticket" size={25} color="#f0ac12" />
								</View>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Voucher</Text>
								<View style={{paddingRight: 20}}>
									<TextInput 
										style={{paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4}} 
										placeholder="Enter voucher code" 
										value={''}
										onChangeText={(searchKeyword) => {
											
										} }
									/> 
								</View>
							</View>
									</View> */}
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								{/*<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandlerAll(selectAll)}>
									<Ionicons name={selectAll == true ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={selectAll == true ? "#0faf9a" : "#aaaaaa"} />
								</TouchableOpacity>*/}
								</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text></Text>
								<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
									<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
									<Text>${this.subtotalPrice().toFixed(2)}</Text>
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
							<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#42f44b', width: 100, height: 25, borderRadius: 5}]} 
							
							onPress={() => this.goToCart()}
							>
								<Text style={{color: '#ffffff'}}>Go to cart</Text>
							</TouchableOpacity>
						</View>
					</View>
				}
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