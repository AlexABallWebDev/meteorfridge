//create collection to hold product objects.
Products = new Mongo.Collection('products');

//code that is only run on the client. note that ALL code is sent to the client,
//but only the code inside this if block will be run on the client.
if (Meteor.isClient) {
	//listen for event where draggable object is dropped on fridge.
	Template.fridge.onRendered(function() {
		var templateInstance = this;
		
		templateInstance.$('#fridge').droppable({
			//when object is dropped on fridge, change the object's place to fridge.
			drop: function(evt, ui) {
				var query = { _id: ui.draggable.data('id') };
				var changes = { $set: { place: 'fridge' } };
				Products.update(query, changes);
			}
		});
	});
	
	//listen for event where draggable object is dropped on productList.
	Template.productList.onRendered(function() {
		var templateInstance = this;
		
		templateInstance.$('#supermarket').droppable({
			//when object is dropped on productList, change the object's place to productList.
			drop: function(evt, ui) {
				var query = { _id: ui.draggable.data('id') };
				var changes = { $set: { place: 'supermarket' } };
				Products.update(query, changes);
			}
		});
	});
	
	//mark productListItems as draggable.
	Template.productListItem.onRendered(function() {
		var templateInstance = this;
		
		templateInstance.$('.draggable').draggable({
			cursor: 'move',
			helper: 'clone'
		});
	});
	
	
  Template.fridge.helpers ({
		//return an array of all the product objects in the fridge.
		products: function() {
			return Products.find ({
				place: 'fridge'
			});
		}
	});
	
	Template.productList.helpers ({
		//return an array of all the product objects in the productList, AKA supermarket.
		products: function() {
			return Products.find ({
				place: 'supermarket'
			});
		}
	});
}

//code that only runs on the server.
if (Meteor.isServer) {
	// code to run on server at startup.
  Meteor.startup(function () {
		//empty fridge and supermarket
		Products.remove({});
		
		//fill the database with some products.
		Products.insert({
			name: 'Milk',
			img: '/milk.png',
			place: 'fridge'
		});
		
		Products.insert({
			name: 'Bread',
			img: '/bread.png',
			place: 'supermarket'
		});
		
		Products.insert({
			name: 'Banana',
			img: '/banana.png',
			place: 'fridge'
		});
		
		Products.insert({
			name: 'Juice',
			img: '/juice.png',
			place: 'fridge'
		});
		
		//extra item
		Products.insert({
			name: 'Pudding',
			img: '/pudding.png',
			place: 'fridge'
		});
  });
}
