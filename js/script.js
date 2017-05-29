jQuery(document).ready(function(){
	
	var form = jQuery('#ajax-contact');
	
	//Messages
	var formMessages = jQuery('#form-messages');
	
	//Form Event Handler
	jQuery(form).submit(function(event){
		
		//stop browser from submitting form
		event.preventDefault();
		console.log('Contact form submitted');
		
		//Serialize data
		var formData = jQuery(form).serialize();
		
		//Submit With Ajax
		jQuery.ajax({
			type: 'POST',
			url: jQuery(form).attr('action'),
			data: formData
		}).done(function(response){
			
			//Make sure message is success
		   jQuery(formMessages).removeclass('error');
		   jQuery(formMessages).addclass('success');
		   
		   //Set Message Text
		   jQuery(formMessages).text(response);
		   
		   //Clear Form Fields
		   jQuery('#name').val('');
		   jQuery('#email').val('');
		   jQuery('#message').val('');
	   }).fail(function(data){
		
		jQuery(formMessages).removeclass('error');
		jQuery(formMessages).addclass('success');
		
		//Set Message Text 
		if(data.response !== ''){
			jQuery(formMessages).text(data.responseText);
		}else{
			jQuery(formMessages).text('An error occured');
		}
		
		
	});
	
	
});