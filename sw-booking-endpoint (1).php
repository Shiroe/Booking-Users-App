<?php
/*
Plugin Name: SW Booking Endpoint
Description: Custom Endpoint for booking requests
Version: 0..1
Plugin URI: https://simplyweb.gr/
Author: Giorgos Tsarmpopoulos
Author URI: https://simplyweb.gr/
*/



function viva_tokenizeCard($card_data){
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => get_field("api_url", 'option')."cards?key=".get_field("public_key", 'option'),
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "{'Number': '".$card_data['number']."','CVC': ".$card_data['ccv'].",'ExpirationDate': '".$card_data['year']."-".$card_data['month']."-15','CardHolderName': '".$card_data['name']."'}",
	  CURLOPT_HTTPHEADER => array(
	    "authorization: ".get_field("api_key", 'option'),
	    "cache-control: no-cache",
	    "content-type: application/json"
	  ),
	));


	$response = json_decode( curl_exec($curl) );
	$err = curl_error($curl);

	curl_close($curl);
	if ($err) {
	  return false;
	} else {
	  if($response->Token){

		  return $response->Token;
	  }else{
		  return false;
	  }
	}
	return false;
}


function viva_getOrderId($bookingRef, $userId, $first_name, $last_name, $phone, $email){
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => get_field("api_url", 'option')."orders",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "{  'Amount': 30,  'SourceCode': ".get_field("source_code", 'option').",  'AllowRecurring': 'true',  'IsPreAuth': 'true',  'MerchantTrns': 'User id: ".$userId."', 'CustomerTrns': 'Booking ref: ".$bookingRef."', 'Phone': '".$phone."', 'Email': '".$email."', 'FullName': '".$first_name.' '.$last_name."'}",
	  CURLOPT_HTTPHEADER => array(
	    "authorization: ".get_field("api_key", 'option'),
	    "cache-control: no-cache",
	    "content-type: application/json",
	    "postman-token: 62f68d51-8e93-6923-f000-8b1176a2bffb"
	  ),
	));

	$response = json_decode( curl_exec($curl) );
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  return false;
	} else {
	  if($response->ErrorCode == '0'){
		  return $response->OrderCode;
	  }else{
		  return false;
	  }
	}
	return false;
}


function viva_getAmountOrderId($bookingRef, $amount, $userId, $first_name, $last_name, $phone, $email){
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => get_field("api_url", 'option')."orders",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "{  'Amount': ".$amount.",  'SourceCode': ".get_field("source_code", 'option').",  'AllowRecurring': 'true',  'IsPreAuth': 'true',  'MerchantTrns': 'User id: ".$userId."', 'CustomerTrns': 'Booking ref: ".$bookingRef."', 'Phone': '".$phone."', 'Email': '".$email."', 'FullName': '".$first_name.' '.$last_name."'}",
	  CURLOPT_HTTPHEADER => array(
	    "authorization: ".get_field("api_key", 'option'),
	    "cache-control: no-cache",
	    "content-type: application/json",
	    "postman-token: 62f68d51-8e93-6923-f000-8b1176a2bffb"
	  ),
	));

	$response = json_decode( curl_exec($curl) );
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  return false;
	} else {
	  if($response->ErrorCode == '0'){
		  return $response->OrderCode;
	  }else{
		  return false;
	  }
	}
	return false;
}

function viva_getTransactionId($token,$orderCode){
	if(!$orderCode && !$token) return;
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => get_field("api_url", 'option')."Transactions",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "{  'OrderCode' : ".$orderCode.",  'SourceCode': ".get_field("source_code", 'option').",  'AllowsRecurring': 'true',  'PreauthCapture': 'true',  'CreditCard' : {     'Token': '".$token."'  }  }",
	  CURLOPT_HTTPHEADER => array(
	    "authorization: ".get_field("api_key", 'option'),
	    "cache-control: no-cache",
	    "content-type: application/json",
	    "postman-token: 9a5e1abf-bd47-9f8d-d73d-6ddc6424bcb5"
	  ),
	));

	$response = json_decode( curl_exec($curl) );
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  return false;
	} else {
	  if( ($response->ErrorCode == '0') && ($response->StatusId == 'F')){
		  return $response->TransactionId;
	  }else{
		  return false;
	  }
	}
	return false;
}

function viva_getSingleTransactionId($token,$orderCode){
	if(!$orderCode && !$token) return;
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => get_field("api_url", 'option')."Transactions",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "{  'OrderCode' : ".$orderCode.",  'SourceCode': ".get_field("source_code", 'option').",  'CreditCard' : {     'Token': '".$token."'  }  }",
	  CURLOPT_HTTPHEADER => array(
	    "authorization: ".get_field("api_key", 'option'),
	    "cache-control: no-cache",
	    "content-type: application/json",
	    "postman-token: 9a5e1abf-bd47-9f8d-d73d-6ddc6424bcb5"
	  ),
	));

	$response = json_decode( curl_exec($curl) );
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  return false;
	} else {
	  if( ($response->ErrorCode == '0') && ($response->StatusId == 'F')){
		  return $response->TransactionId;
	  }else{
		  return false;
	  }
	}
	return false;
}

function viva_deleteTransaction($transactionId,$bookingRef){
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => get_field("api_url", 'option')."transactions/".$transactionId."?amount=30&CustomerTrns=BookingRef%3A%20".$bookingRef,
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "DELETE",
	  CURLOPT_POSTFIELDS => "",
	  CURLOPT_HTTPHEADER => array(
	    "authorization: ".get_field("api_key", 'option'),
	    "cache-control: no-cache",
	    "content-type: application/json",
	    "postman-token: 694c07c1-1a43-4c96-74b2-ae39b77b34a9"
	  ),
	));

	$response = json_decode( curl_exec($curl) );
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  return false;
	} else {
	  if($response->ErrorCode == '0'){
		  return true;
	  }else{
		  return false;
	  }
	}
	return false;
}

function viva_recurringTransaction($transaction_id,$amount,$bookingRef,$hotelId){

	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => get_field("api_url", 'option')."transactions/".$transaction_id,
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "{  'Installments': 0,  'Amount': ".$amount.",  'CustomerTrns': 'BookingRef: ".$bookingRef."',  'MerchantTrns': 'HotelId: ".$hotelId."',  'ActionUser': 'System'}",
	  CURLOPT_HTTPHEADER => array(
	    "authorization: ".get_field("api_key", 'option'),
	    "cache-control: no-cache",
	    "content-type: application/json"
	  ),
	));

	$response = json_decode( curl_exec($curl) );
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  return false;
	} else {
	  if( ($response->ErrorCode == '0') && ($response->StatusId == 'F')){
		  return $response->TransactionId;
	  }else{
		  return false;
	  }
	}
	return false;
}

function viva_getTransaction($transaction_id){

	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => get_field("api_url", 'option')."transactions/".$transaction_id,
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "GET",
	  CURLOPT_POSTFIELDS => "",
	  CURLOPT_HTTPHEADER => array(
	    "authorization: ".get_field("api_key", 'option'),
	    "cache-control: no-cache",
	    "content-type: application/json",
	    "postman-token: e00c1fb1-36ea-19f1-fd7c-9aa63a04cd6d"
	  ),
	));

	$response = json_decode( curl_exec($curl) );
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  return false;
	} else {
	  if( ($response->ErrorCode == '0') ){
		  if (count($response->Transactions)){
		  	return $response->Transactions;
		  }
	  }else{
		  return false;
	  }
	}
	return false;
}

function viva_preauthorizeCard($token, $bookingRef, $userId, $first_name, $last_name, $phone, $email){

	$orderCode = viva_getOrderId( $bookingRef, $userId, $first_name, $last_name, $phone, $email);

	$transaction_id;

	if($orderCode){
		$transaction_id = viva_getTransactionId($token, $orderCode);
	}

	if($transaction_id){
		viva_deleteTransaction($transaction_id,$bookingRef);
		return $transaction_id;
	}

	return false;
}

function viva_investigateTransaction($book_id,$transaction_id){
	if(!$transaction_id){
		//we couldent charge the user! handle this!
		//NO THIS IS SYSTEM ERROR, We should always have $transaction_id

		update_post_meta($book_id, 'system_payment_status','charge_error');
		update_field("payment_message","[System failure] Payment Failed: coulden't get transaction_id ", $book_id);

		//register following filter to handle this event (ex: send emails)
		apply_filters( 'vp_bookingSuccesfullyOwnedButNotPaid', $book_id );

		return(
			json_encode(
				array(
					"status" => "success",
					"code" => "charge_error",
					"message" => "no transaction_id"
				)
			)
		);//hotel owner doesn't care for payment errors

	}
	else{
		//Transaction is ok, let's investigate!

		$transaction = viva_getTransaction($transaction_id)[0];

		//lets overide the transaction_id with the new one that noone can recharge!
		update_post_meta($book_id, 'transaction_id', $transaction_id);

		update_post_meta($book_id, 'paid_amount', $transaction->Amount );

		update_post_meta($book_id, 'card_Number', $transaction->CreditCard->Number );
		update_post_meta($book_id, 'card_lastdigits', substr($transaction->CreditCard->Number, -4) );
		update_post_meta($book_id, 'card_CountryCode', $transaction->CreditCard->CountryCode );
		update_post_meta($book_id, 'card_IssuingBank', $transaction->CreditCard->IssuingBank );
		update_post_meta($book_id, 'card_CardHolderName', $transaction->CreditCard->CardHolderName );
		update_post_meta($book_id, 'card_ExpirationDate', $transaction->CreditCard->ExpirationDate );
		update_post_meta($book_id, 'card_type', $transaction->CreditCard->CardType->Name );

		update_post_meta($book_id, 'payment_status', $transaction->StatusId );
		update_post_meta($book_id, 'order_id', $transaction->Order->OrderCode );

		$viva_staus = array(
			'E'  => 'The transaction was not completed because of an error',
		    'A'  => 'The transaction is in progress',
		    'M'  => 'The cardholder has disputed the transaction with the issuing Bank',
		    'MA' => 'Dispute Awaiting Response',
		    'MI' => 'Dispute in Progress',
		    'ML' => 'A disputed transaction has been refunded (Dispute Lost)',
		    'MW' => 'Dispute Won',
		    'MS' => 'Suspected Dispute',
		    'X' => 'The transaction was cancelled by the merchant',
		    'R'  => 'The transaction has been fully or partially refunded',
		    'F'  => 'The transaction has been completed successfully'
	    );

		update_post_meta($book_id, 'payment_message', $viva_staus[ $transaction->StatusId ] );

		if($transaction->StatusId == 'F'){
			//update_post_meta($post_id, 'system_payment_status','charge_complete');
			update_field('system_payment_status', 'charge_complete', $book_id);

			//register following filter to handle this event (ex: send emails)
			apply_filters( 'vp_bookingSuccesfullyOwnedAndPaid', $book_id );
			return(
				json_encode(
					array(
						"status" => "success",
						"code" => "charge_complete",
						"message" => "Your booking has been paid!"
					)
				)
			);
		}
		else {
			update_field('system_payment_status', 'charge_error', $book_id);
			//register following filter to handle this event (ex: send emails)
			apply_filters( 'vp_bookingSuccesfullyOwnedAndNotPaid', $book_id );
			return(
				json_encode(
					array(
						"status" => "failed",
						"code" => "charge_error",
						"message" => "We couldn't charge your card"
					)
				)
			);
		}
	}
}

function chargeBookingWithCard(){

	check_ajax_referer( 'ViralPassion_Rulez', 'token' );
	$request_data = $_POST;
	$book_id = $request_data['booking_id'];

	$system_payment_status = get_post_meta($book_id, 'system_payment_status', true);
	if($system_payment_status != 'charge_error'){
		//error! this booking should not try to recharge!
		exit(
			json_encode(
				array(
					"status" => "error",
					"message"=> "Something is wrong! You should not try to recharge this booking!"
				)
			)
		);
	}
	else{

		$card_token = viva_tokenizeCard($request_data['card_data']);

		if (!$card_token){

			exit(
				json_encode(
					array(
						"status" => "error",
						"message"=> "can't tokenize card"
					)
				)
			);

		}
		else{

			update_field("payment_status","failure", $book_id);// init as failure (we will change it only on success transaction
			update_field("payment_message","[system failure] Payment Failed: try recurringTransaction", $book_id);

			$commission = floatval( get_field("commission_for_advanced_payment", 'option') );

			$viva_amount = (floatval(get_field('price', $book_id))*100) * ($commission/100); //get 10% of total value

			$orderCode = viva_getAmountOrderId(get_field('references', $book_id), $viva_amount, get_field('post_author', $book_id), get_field('first_name', $book_id), get_field('last_name', $book_id), get_field('telephone', $book_id), get_field('email', $book_id));
			$transaction_id = viva_getSingleTransactionId($card_token,$orderCode);
			exit ( viva_investigateTransaction($book_id,$transaction_id) );
		}
	}
}
add_action( 'wp_ajax_chargeBookingWithCard', 'chargeBookingWithCard' );

function retryPaymentOnBooking(){
	$request_data = $_POST;
	if($request_data['origin'] != 'mobileapp' || $request_data['hash'] != get_post_meta($request_data['booking_id'], 'hash_code', true)) {
		check_ajax_referer( 'ViralPassion_Rulez', 'token' );
	}

	$book_id = $request_data['booking_id'];


	$system_payment_status = get_post_meta($book_id, 'system_payment_status', true);
	if($system_payment_status != 'charge_error'){
		//error! this booking should not try to recharge!
		exit(
			json_encode(
				array(
					"status" => "error",
					"message"=> "Something is wrong! You should not try to recharge this booking!"
				)
			)
		);
	}
	else {

		update_field("payment_status","failure", $book_id);// init as failure (we will change it only on success transaction
		update_field("payment_message","[system failure] Payment Failed: try recurringTransaction", $book_id);

		$commission = floatval( get_field("commission_for_advanced_payment", 'option') );

		$viva_amount = (floatval(get_field('price', $book_id))*100) * ($commission/100); //get 10% of total value

 // 		exit(get_field('claimed_by_hotel', $book_id));
	// 		exit(get_post_meta($book_id, 'claimed_by_hotel',true));

		$transaction_id = viva_recurringTransaction(get_field('transaction_id', $book_id),$viva_amount,get_field('references', $book_id),get_post_meta($book_id, 'claimed_by_hotel',true));



		exit (viva_investigateTransaction($book_id,$transaction_id));
	}

}
add_action( 'wp_ajax_retryPaymentOnBooking', 'retryPaymentOnBooking' );

function processBooking() {
	$request_data =  json_decode(file_get_contents('php://input'),true);


	if ($request_data['submit-request']) {

		if(!isset($request_data['wifi'])) {
			$request_data['wifi'] = 0;
		}
		if(!isset($request_data['breakfast'])) {
			$request_data['breakfast'] = 0;
		}
		if(!isset($request_data['pool'])) {
			$request_data['pool'] = 0;
		}
		if(!isset($request_data['stars'])) {
			$request_data['stars'] = 0;
		}


		if (
			isset(
				$request_data['address'],
				$request_data['center_lat'],
				$request_data['center_lng'],
				$request_data['range'],
				$request_data['persons'],
				$request_data['check_in_date'],
				$request_data['check_out_date'],
				$request_data['price'],
				$request_data['single_room'],
				$request_data['double_room'],
				$request_data['triple_room'],
				$request_data['wifi'],
				$request_data['breakfast'],
				$request_data['stars'],
				$request_data['pool'],
				$request_data['first_name'],
				$request_data['last_name'],
				$request_data['telephone'],
				$request_data['email'],
				$request_data['card_data'],
				$request_data['roomNightPrice'],
				$request_data['nights']
			)
		) {
			/*check price is corect */


			$final_price = ((floatval($request_data['roomNightPrice'])) * (floatval ($request_data['double_room'])) *
				(floatval ($request_data['nights'])));
			if ($final_price != (floatval($request_data['price']))){
				 exit(json_encode(array(
						"error"=>true,
						"msg"=> 'Something went wrong 1'
					)));
			}
			$card_token = viva_tokenizeCard($request_data['card_data']);

			if(!$card_token){
				exit(json_encode(array(
					"error" => true,
					"msg" => "Wrong card data, please try again"
				)));
				/* return with error, no valid card */
			}
			else {


				$booking_args = array(
					'post_title'	=>	'',
					'post_type'		=>	'booking',
					'post_status'   => 'publish',
				);

				$post_id = wp_insert_post($booking_args);

				$ref = 'ref'.$post_id.dechex( $post_id+$post_id*$price );



				// $date = new DateTime(current_time('Y-m-d H:i:s'));
				// $date->modify('+' . get_field('request_expiration', 'option') . ' hours');
				// $exp_time = $date->format("YmdHis");


				$exp_time = date('YmdHis', strtotime('+' . get_field('request_expiration', 'option') . ' hours'));
				update_post_meta($post_id, 'references', $ref );
				update_post_meta($post_id, 'offer_timeout', $exp_time);
				update_post_meta($post_id, 'status', 0);

				$booking = get_post($post_id);
				$booking->post_title = $ref;

				//check if user with email exists and if yes assign user as the author of the booking else create traveler user with random password and assign as author of the booking

				//$user_id = username_exists($request_data['email']);
				$user = get_user_by('email', $request_data['email']);
				//$user_id = $user->ID;
				//error_log($user_id);
				if ($user) {
					error_log($user->ID);
					$booking->post_author = $user->ID;
					$user_bookings = get_usermeta($user->ID, 'total_requests');
					$user_bookings++;
					update_user_meta($user->ID, 'total_requests', $user_bookings);
					$user_id = $user->ID;
				}
				else {
					error_log('new_user');
					$random_password = wp_generate_password( $length=12, $include_standard_special_chars=false );
					$user_id = wp_create_user( $request_data['email'], $random_password, $request_data['email'] );
					wp_update_user(array(
					    'ID' => $user_id,
					    'role' => 'traveler'
					));
					update_user_meta($user_id, 'first_name', $request_data['first_name']);
					update_user_meta($user_id, 'last_name', $request_data['last_name']);
					update_user_meta($user_id, 'display_name', $request_data['first_name'] . ' ' . $request_data['last_name']);
					update_user_meta($user_id, 'telephone', $request_data['telephone']);
					update_user_meta($user_id, 'total_requests', 1);

					$booking->post_author = $user_id;
				}

				wp_update_post( $booking );

				$transaction_id = viva_preauthorizeCard($card_token, $ref, $user_id, $request_data['first_name'], $request_data['last_name'], $request_data['telephone'], $request_data['email']);

				if(!$transaction_id){
					/* delete user and booking and return with error */
					update_field('system_payment_status', 'card_error', $post_id);
					wp_delete_post($post_id);

					exit(json_encode(array(
									"error"=>true,
									"msg"=> 'Something went wrong when we tried to authorize your card. Please try again...'
								)));


				}
				else{

					update_post_meta($post_id, 'transaction_id', $transaction_id );
					update_field('system_payment_status', 'waiting_charge', $post_id);

					$transaction = viva_getTransaction($transaction_id)[0];

					update_post_meta($post_id, 'card_Number', $transaction->CreditCard->Number );
					update_post_meta($post_id, 'card_lastdigits', substr($transaction->CreditCard->Number, -4) );
					update_post_meta($post_id, 'card_CountryCode', $transaction->CreditCard->CountryCode );
					update_post_meta($post_id, 'card_IssuingBank', $transaction->CreditCard->IssuingBank );
					update_post_meta($post_id, 'card_CardHolderName', $transaction->CreditCard->CardHolderName );
					update_post_meta($post_id, 'card_ExpirationDate', $transaction->CreditCard->ExpirationDate );
					update_post_meta($post_id, 'card_type', $transaction->CreditCard->CardType->Name );

					update_post_meta($post_id, 'payment_status', $transaction->StatusId );
					update_post_meta($post_id, 'order_id', $transaction->Order->OrderCode );

					$viva_staus = array(
						'E'  => 'The transaction was not completed because of an error',
					    'A'  => 'The transaction is in progress',
					    'M'  => 'The cardholder has disputed the transaction with the issuing Bank',
					    'MA' => 'Dispute Awaiting Response',
					    'MI' => 'Dispute in Progress',
					    'ML' => 'A disputed transaction has been refunded (Dispute Lost)',
					    'MW' => 'Dispute Won',
					    'MS' => 'Suspected Dispute',
					    'X' => 'The transaction was cancelled by the merchant',
					    'R'  => 'The transaction has been fully or partially refunded',
					    'F'  => 'The transaction has been completed successfully'
				    );

					update_post_meta($post_id, 'payment_message', $viva_staus[ $transaction->StatusId ] );




					//Change date format from DD/MM/YYYY to YYYYMMDD

					$request_data['check_in_date'] = date('Ymd', strtotime(str_replace('/', '-', $request_data['check_in_date'])));
					$request_data['check_out_date'] = date('Ymd', strtotime(str_replace('/', '-', $request_data['check_out_date'])));

					foreach ($request_data as $meta_key => $meta_value) {
						if ($meta_key == 'email') {
							$meta_value = sanitize_email($meta_value);
						}
						else {
							$meta_value = sanitize_text_field($meta_value);
						}
						if (($meta_key != 'submit-request') && ($meta_key != 'card_data')) {
							update_post_meta($post_id, $meta_key, $meta_value );
							//echo $meta_key . ':' . $meta_value . '<br>';
						}

					}

					$c_hash=md5($reference.$price.$persons.$check_in_date.$check_out_date);

					update_post_meta($post_id, 'hash_code', $c_hash);

					if ($post_id) {
						ob_start();

						$mail_options = array(
							'option_prefix'	=> 'traveller_new_booking',
							'booking_id'	=> $post_id,
							'name'			=> get_post_meta($post_id, 'first_name', true) . ' ' . get_post_meta($post_id, 'last_name', true),
							'cta_link'		=> home_url() . '/mybooking/?source=e&id=' . $post_id . '&hash=' . $c_hash
						);
						// include( get_stylesheet_directory() . '/email-templates/traveler-booking-info.php');
						include( get_stylesheet_directory() . '/email-templates/template.php');

						$message_body = ob_get_clean();

						// error_log('New Booking Message Body---------->' . $message_body);
						//error_log('traveler:' . get_post_meta($post_id, 'email', true));
						sw_email_function(get_post_meta($post_id, 'email', true), get_field('traveller_new_booking_title', 'option'), $message_body);
					}

					//FIND RELEVANT HOTELS QUERY
					$range = $request_data['range'] / 1000;

					$hotel_array = get_nearby_hotels($request_data['center_lat'], $request_data['center_lng'], $range, $request_data['wifi'], $request_data['breakfast'], $request_data['pool'], $request_data['stars']);
					if ($hotel_array != 'fail') {
						foreach ($hotel_array['hotel_ids'] as $hotel_id) {
							register_hotel_connection($post_id, $hotel_id);


							//Send Each hotel an email
							ob_start();
							if (get_post_meta($hotel_id, 'imported', true) == 'yes') { // If hotel hasn't registered yet (SPAM EMAIL)
								// include( get_stylesheet_directory() . '/email-templates/hotel-booking-notify-imported.php');
								$mail_options = array(
									'option_prefix'	=> 'imported_hotel_new_request',
									'booking_id'	=> $post_id,
									'name'			=> get_the_title($hotel_id)
								);
								$subject = get_field('imported_hotel_new_request', 'option');
								// error_log('in hotel registration if');

							}
							else if (!get_post_meta($hotel_id, 'imported', true)) {
								// include( get_stylesheet_directory() . '/email-templates/hotel-booking-notify.php');
								$owner_id =  get_post_field( 'post_author', $hotel_id );
								$owner_name =  get_the_author_meta('display_name', $owner_id);
								// error_log('owner_id' . $owner_id . 'owner_name' . $owner_name);
								$mail_options = array(
									'option_prefix'	=> 'hotel_new_request',
									'booking_id'	=> $post_id,
									'name'			=> $owner_name
								);
								$subject = get_field('hotel_new_request_title', 'option');

							}
							include( get_stylesheet_directory() . '/email-templates/template.php');

							$message_body = ob_get_clean();


							sw_email_function(get_post_meta($hotel_id, 'email', true), $subject, $message_body);
						}
					}

					exit(json_encode(array(
						"error"=>false,
						"url"=> 'mybooking/?success=true&id='.$post_id.'&hash='.$c_hash.'&source=e'
					)));
				}
			}

		}
	}
	
	exit(json_encode(array(
					"error"=>true,
					"msg"=> 'Something went wrong 3'
				)));
	
	wp_die();
}



add_action( 'wp_ajax_nopriv_processBooking', 'processBooking' );
add_action( 'wp_ajax_processBooking', 'processBooking' );

function hotel_query() {

	$request_data = $_REQUEST;

	if ( isset( $request_data['center_lat'], $request_data['center_lng'], $request_data['range'] ) ) {
		if(!isset($request_data['wifi'])) {
			$request_data['wifi'] = 0;
		}
		if(!isset($request_data['breakfast'])) {
			$request_data['breakfast'] = 0;
		}
		if(!isset($request_data['pool'])) {
			$request_data['pool'] = 0;
		}
		if(!isset($request_data['stars'])) {
			$request_data['stars'] = 0;
		}

		//FIND RELEVANT HOTELS QUERY
		$range = intval($request_data['range']) / 1000;

		$hotel_array = get_nearby_hotels($request_data['center_lat'], $request_data['center_lng'], $range, intval($request_data['wifi']), intval($request_data['breakfast']), intval($request_data['pool']), $request_data['stars']);

		$responseObj = [
			"hotels_found" => $hotel_array['hotel_num']
		];

		if(isset($hotel_array['hotel_num'])) {
			exit(json_encode($responseObj));
		}
		else {
			exit(json_encode(["hotels_found" => 0]));
		}

	}
}

add_action( 'wp_ajax_nopriv_findHotels', 'hotel_query' );
add_action( 'wp_ajax_findHotels', 'hotel_query' );

//Super Admin Hotel Listing



function sa_hotel_query() {

	$query_args = $_REQUEST;

	$count_hotels = wp_count_posts('hotel');

	$published_hotels = $count_hotels->publish;

	// WP_Query arguments
	$args = array (
		'post_type'              => array( 'hotel' ),
		'posts_per_page'         => $_REQUEST['posts_per_page'],
		'offset'				 => $_REQUEST['offset'],
		'orderby'                => 'title',
		'post_status'			 => 'publish'
	);

	// The Query
	$query = new WP_Query( $args );

	$hotels = array();

	// The Loop
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();

			if (get_field('image')) {
				$image = get_field('image');
				$img_src = $image['sizes'][ 'thumbnail' ];
			}
			else {
				$img_src = '';
			}

			$hotels[] = array(
				'id'	=> get_the_ID(),
				'name'	=> get_the_title(),
				'img'	=> $img_src,
				'email'	=> get_field('email'),
				'phone'	=> get_field('telephone'),
				'status'=> get_field('imported') == 'yes' ? 'imported' : 'verified',
				'pending_review'	=> get_field('pending_review') == 1 ? true : false,
				'wifi'	=> get_field('wifi') == 1 ? true : false,
				'breakfast'	=> get_field('breakfast') == 1 ? true : false,
				'pool'	=> get_field('pool') == 1 ? true : false,
				'stars'	=> get_field('stars'),
				'url'	=> get_field('url'),
				'address'	=> get_field('address'),
				'zip_code'	=> get_field('zip_code'),
				'city'	=> get_field('city'),
				'map_location'	=> array(
					'address'	=> get_field('map_location', $hotel_id)['address'],
					'lat'	=> get_field('map_location', $hotel_id)['lat'],
					'lng'	=> get_field('map_location', $hotel_id)['lng']
				),
				'gplaces'	=> get_field('gplaces', $hotel_id)
			);

		}
	} else {
		exit(false);
	}

	// Restore original Post Data
	wp_reset_postdata();


	$return_data = array(
		'hotels'	=>	$hotels,
		'count'		=> 	$published_hotels
	);




	exit( json_encode( $return_data ));

}

add_action( 'wp_ajax_listHotels', 'sa_hotel_query' );


function sa_bookings_query() {
	$query_args = $_REQUEST;

	$count_bookings = wp_count_posts('hotel');

	$published_bookings = $count_bookings->publish;

	// WP_Query arguments
	$args = array (
		'post_type'              => array( 'booking' ),
		'posts_per_page'         => $_REQUEST['posts_per_page'],
		'offset'				 => $_REQUEST['offset'],
		'post_status'			 => 'publish'

	);

	// The Query
	$query = new WP_Query( $args );

	$bookings = array();

	// The Loop
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();

			if (get_field('claimed_by_hotel')) {
				$hotel_name = get_the_title(get_field('claimed_by_hotel'));
			}
			else {
				$hotel_name = '';
			}

			$bookings[] = array(
				'id'	=> get_the_ID(),
				'reference'	=> get_field('references'),
				'created'	=> get_the_date('d/m/Y'),
				'name'		=> get_field('first_name') . ' ' .get_field('last_name'),
				'price'		=> get_field('price'),
				'checkin'	=> date('d/m/Y', strtotime(get_field('check_in_date')) ) ,
				'checkout'	=> date('d/m/Y', strtotime(get_field('check_out_date')) ),
				'location'	=> get_field('place_name'),
				'wifi'		=> get_field('wifi') == 1 ? true : false,
				'breakfast'	=> get_field('breakfast') == 1 ? true : false,
				'pool'		=> get_field('pool') == 1 ? true : false,
				'stars'		=> get_field('stars'),
				'persons'	=> get_field('persons'),
				//'status'	=> get_field_object('status')['choices'][get_field('status')],
				'status'	=> get_field('status'),
				'hotel'		=> $hotel_name,
				'hotelid'	=> get_field('claimed_by_hotel'),
				'payment_status' => get_field('payment_status'),
				'payment_message' => get_field('payment_message'),
				'card_type'		=> get_field('card_type'),
				'card_lastdigits' => get_field('card_lastdigits'),
				'system_payment_status'	=> get_field('system_payment_status'),
				'single_room' 	=> get_field('single_room'),
				'double_room' 	=> get_field('double_room'),
				'triple_room' 	=> get_field('triple_room'),
				'email'	=> get_field('email'),
				'telephone'	=> get_field('telephone'),
			);

		}
	} else {
		exit(false);
	}

	// Restore original Post Data
	wp_reset_postdata();


	$return_data = array(
		'bookings'	=>	$bookings,
		'count'		=> 	$published_bookings
	);




	exit( json_encode( $return_data ));
}

add_action( 'wp_ajax_listBookings', 'sa_bookings_query' );

/**
 * Sort Users By Meta Key
 *
 * @param array $user_ids
 * @param string $meta_key
 *
 * @return array|boolean
 */
function sw_sort_users_by_meta_key( array $user_ids, $meta_key, $sort ) {
    error_log($sort);
    $user_order = array();
    foreach( $user_ids as $user_id ) {
        $user_order[$user_id] = intval( get_user_meta( $user_id, $meta_key, true ) );
    }
    if ($sort = 'descending') {
	    arsort( $user_order );
    }
    else {
	    asort( $user_order );
    }


    return array_keys( $user_order );
}

//Super Admin Hotel Listing

function sa_traveler_query() {




	// WP_User_Query arguments
	$args = array (
		'role'           => 'traveler',
		'order'          => 'DESC',
		'orderby'        => 'user_registered',
	);

	$travelers = array();

	// The User Query
	$traveler_query = new WP_User_Query( $args );

	// The User Loop
	if ( ! empty( $traveler_query->results ) ) {
		foreach ( $traveler_query->results as $user ) {
			$travelers[] = array(
				'id'	=> $user->ID,
				'name' => $user->first_name . ' ' . $user->last_name,
				'first_name' => $user->first_name,
				'last_name' => $user->last_name,
				'email'	=>	$user->user_email,
				'phone'	=>	$user->telephone,
				'claimed_requests'	=>	$user->claimed_requests ? $user->claimed_requests : 0,
				'total_requests'	=>	$user->total_requests ? $user->total_requests : 0,
				'revenue'	=>	$user->total_revenue ? $user->total_revenue : 0,
				'reg_date'	=> date('j M Y', strtotime($user->user_registered)),
				'reg_date_order'=> date('Ymd', strtotime($user->user_registered)),
			);
		}
	} else {
		// no users found
	}

	/*
		$return_data = array(
			'htmldata'	=> $html_data,
			'locations'	=> $locations,
			'details'	=> $hotel_details,

		);
	*/



	exit( json_encode( $travelers ));

}
add_action( 'wp_ajax_listTravelers', 'sa_traveler_query' );




function sw_email_function($to_email, $subject, $message_body) {
	//error_log('in_email');
	//error_log($to_email);
	//error_log($subject);
	//error_log($message_body);
	if ($to_email && $subject && $message_body) {
		//error_log('in_if_email');
		$headers = array();

		$headers[] = 'From: Travelusive <info@booking.vpsites.eu>';

		$headers[] = 'Content-Type: text/html; charset=UTF-8';

		wp_mail($to_email, $subject, $message_body, $headers);

	}


}



//Notify User when

add_action( 'added_post_meta', 'sw_notify_traveler', 10, 4 );
add_action( 'updated_post_meta', 'sw_notify_traveler', 10, 4 );
function sw_notify_traveler( $meta_id, $post_id, $meta_key, $meta_value ) {
    $post_type = get_post_type($post_id);
    if ($post_type == 'booking') {
	    if ($meta_key == 'claimed_by_hotel') {
		    if ($meta_value != '') {
			    $hotel_id = $meta_value;

			    //Send traveler an email with hotel data
				ob_start();
				// include( get_stylesheet_directory() . '/email-templates/traveler-accepted-booking-notify.php');
				$mail_options = array(
					'option_prefix'	=> 'traveler_booking_accept',
					'hotel_id'	=> $hotel_id,
					'name'			=> get_post_meta($post_id, 'first_name', true) . ' ' . get_post_meta($post_id, 'last_name', true),
					'show_payment'	=> true
				);
				include( get_stylesheet_directory() . '/email-templates/template.php');


				$message_body = ob_get_clean();

				sw_email_function(get_post_meta($post_id, 'email', true), get_field('traveler_booking_accept_title', 'option'), $message_body);

				//Send hotel an email with booking data
				ob_start();

				$owner_id =  get_post_field( 'post_author', $hotel_id );
				$owner_name =  get_the_author_meta('display_name', $owner_id);
				// include( get_stylesheet_directory() . '/email-templates/traveler-accepted-booking-notify.php');
				$mail_options = array(
					'option_prefix'	=> 'hotel_booking_accept',
					'booking_id'	=> $post_id,
					'name'			=> $owner_name
				);
				include( get_stylesheet_directory() . '/email-templates/template.php');


				$message_body = ob_get_clean();

				sw_email_function(get_post_meta($hotel_id, 'email', true), get_field('hotel_booking_accept_title', 'option'), $message_body);

		    }
	    }

	    else if ($meta_key == 'status') {
		    if ($meta_value == '2') { // Booking Expired
				error_log('status expired');
				//Send traveler an email with hotel data
				ob_start();
				// include( get_stylesheet_directory() . '/email-templates/traveler-expired-booking-notify.php');
				$mail_options = array(
					'option_prefix'	=> 'traveller_booking_expired',
					'booking_id'	=> $post_id,
					'name'			=> get_post_meta($post_id, 'first_name', true) . ' ' . get_post_meta($post_id, 'last_name', true),
				);
				include( get_stylesheet_directory() . '/email-templates/template.php');


				$message_body = ob_get_clean();

				// error_log($message_body);

				sw_email_function(get_post_meta($post_id, 'email', true), get_field('traveller_booking_expired_title', 'option'), $message_body);

		    }
			else if ($meta_value == '3') {
				// error_log('status canceled');
				//Send traveler an email with hotel data
				ob_start();
				// include( get_stylesheet_directory() . '/email-templates/traveler-canceled-booking-notify.php');
				$mail_options = array(
					'option_prefix'	=> 'traveller_booking_canceled',
					'booking_id'	=> $post_id,
					'name'			=> get_post_meta($post_id, 'first_name', true) . ' ' . get_post_meta($post_id, 'last_name', true),
				);
				include( get_stylesheet_directory() . '/email-templates/template.php');


				$message_body = ob_get_clean();

				sw_email_function(get_post_meta($post_id, 'email', true), get_field('traveller_booking_canceled_title', 'option'), $message_body);

				//Send hotel an email that the booking was canceled
				if($hotel_id = get_post_meta($post_id, 'claimed_by_hotel', true)) {
					ob_start();
					// include( get_stylesheet_directory() . '/email-templates/traveler-canceled-booking-notify.php');

					$owner_id =  get_post_field( 'post_author', $hotel_id );
					$owner_name =  get_the_author_meta('display_name', $owner_id);

					$mail_options = array(
						'option_prefix'	=> 'hotel_booking_canceled',
						'booking_id'	=> $post_id,
						'name'			=> $owner_name
					);
					include( get_stylesheet_directory() . '/email-templates/template.php');


					$message_body = ob_get_clean();

					sw_email_function(get_post_meta($hotel_id, 'email', true), get_field('hotel_booking_canceled_title', 'option'), $message_body);
				}



		    }
	    }

		else if ($meta_key == 'system_payment_status') {
			if ($meta_value == 'charge_error') {
				// error_log('in charge error if');
				//Send traveler an email with hotel data
				ob_start();
				// include( get_stylesheet_directory() . '/email-templates/traveler-accepted-booking-notify.php');
				$mail_options = array(
					'option_prefix'	=> 'traveler_booking_charge_failed',
					'booking_id'	=> $booking_id,
					'name'			=> get_post_meta($post_id, 'first_name', true) . ' ' . get_post_meta($post_id, 'last_name', true),
					'show_payment'	=> true
				);
				include( get_stylesheet_directory() . '/email-templates/template.php');


				$message_body = ob_get_clean();

				sw_email_function(get_post_meta($post_id, 'email', true), get_field('traveler_booking_charge_failed_title', 'option'), $message_body);
			}
		}

    }


}

function get_traveler_revenue($traveler_id) {
	// WP_Query arguments
	$args = array (
		'post_type'              => array( 'booking' ),
		'author'                 => $traveler_id,
		'posts_per_page'         => '-1',
		'meta_query'			 => array(
			'key'	=>	'status',
			'value'	=>	1
		)
	);

	// The Query
	$query = new WP_Query( $args );

	$return_data = array();

	$return_data['revenue'] = 0;
	// The Loop
	if ( $query->have_posts() ) {
		$return_data['count'] = $query->post_count;
		while ( $query->have_posts() ) {
			$query->the_post();


			$return_data['revenue'] = $return_data['revenue'] + get_field('price');
		}
	} else {
		$return_data['count'] = 0;
	}

	// Restore original Post Data
	wp_reset_postdata();

	return $return_data;
}

function hotel_dashboard_stats() {
	$query_args = $_REQUEST;
	if (isset($query_args['hotelid']) && $query_args['hotelid'] != '') {
		$montth = date('m', strtotime('1 year ago') );
		$year = date('Y', strtotime('1 year ago') );
		$one_year_ago_date = $year . $montth . '01';
		// WP_Query arguments
		//exit($query_args['hotelid']);
		$args = array (
			'post_type'              => array( 'booking' ),

			'posts_per_page'         => '-1',
			'meta_query'			 => array(
				array(
					'key'	=>	'claimed_by_hotel',
					'value'	=>	$query_args['hotelid'],
					'compare'	=> '='
				)
			)
		);

		// The Query
		$query = new WP_Query( $args );

		$accepted_requests = $query->post_count;
		$travelers = 0;
		$revenue_per_month = array();
		$bookings_per_month = array();

		$return_data = array();

		//$return_data['revenue'] = 0;
		// The Loop
		if ( $query->have_posts() ) {
			$return_data['count'] = $query->post_count;
			while ( $query->have_posts() ) {
				$query->the_post();

				$travelers = $travelers + get_field('persons');
				if (get_the_date('Ymd') > $one_year_ago_date) {
					$montth = get_the_date('Ym', $post->ID);
					$revenue_per_month[$montth] = $revenue_per_month[$montth] + get_field('price');

					$bookings_per_month[$montth] = $bookings_per_month[$montth] + 1;
				}


			}
			$revenue_per_month['201605'] = 23450000;
			$revenue_per_month['201508'] = 14450000;
			$revenue_per_month['201601'] = 43445000;
			$revenue_per_month['201512'] = 34450000;
			$revenue_per_month['201507'] = 74450000;
			$revenue_per_month['201604'] = 23445000;
			$revenue_per_month['201603'] = 24500000;
			$revenue_per_month['201602'] = 53445000;
			$revenue_per_month['201511'] = 94450000;
			$revenue_per_month['201510'] = 78445000;
			$revenue_per_month['201509'] = 74450000;

			$bookings_per_month['201605'] = 23;
			$bookings_per_month['201508'] = 14;
			$bookings_per_month['201601'] = 43;
			$bookings_per_month['201512'] = 34;
			$bookings_per_month['201507'] = 74;
			$bookings_per_month['201604'] = 23;
			$bookings_per_month['201603'] = 24;
			$bookings_per_month['201602'] = 53;
			$bookings_per_month['201511'] = 94;
			$bookings_per_month['201510'] = 78;
			$bookings_per_month['201509'] = 74;

			$revenue_per_month_obj = array();

			foreach ($revenue_per_month as $key=>$value) {
				$revenue_per_month_obj[] = array(
					'month'	=> $key,
					'revenue'	=> $value
				);
			}

			$bookings_per_month_obj = array();

			foreach ($bookings_per_month as $key=>$value) {
				$bookings_per_month_obj[] = array(
					'month'	=> $key,
					'bookings'	=> $value
				);
			}

		} else {
			$return_data['count'] = 0;
		}

		// Restore original Post Data
		wp_reset_postdata();

		$return_data['accepted_requests'] = $accepted_requests;
		$return_data['travelers'] = $travelers;
		$return_data['revenue_per_month'] = $revenue_per_month_obj;
		$return_data['bookings_per_month'] = $bookings_per_month_obj;

		exit(json_encode($return_data));

	}
	else {
		exit(false);
	}
}
add_action( 'wp_ajax_hotelDashStats', 'hotel_dashboard_stats' );

function update_traveller_fields() {
	$query_args = $_REQUEST;
	$response = array();

	if(isset($query_args['id'])){
		$id = $query_args['id'];
	}

	if(isset($query_args['email'])){
		$email = $query_args['email'];
		if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
			if(isset($query_args['first_name']) && isset($query_args['last_name'])){
				$first_name = $query_args['first_name'];
				$last_name = $query_args['last_name'];
				update_user_meta($id, 'first_name', $first_name);
				update_user_meta($id, 'last_name', $last_name);
				update_user_meta($id, 'display_name', $first_name . ' ' . $last_name);
			}

			if(isset($query_args['phone'])){
				$phone = $query_args['phone'];
				update_user_meta($id, 'telephone', $phone);
			}

			update_user_meta($id, 'email', $email);
			$response = array(
				'status' => 'success'
			);
			exit(json_encode($response));
		}else {
			$response = array(
				'status' => 'failure',
				'error_message' => $email . 'is not a valid email address, so it remained the same.'
			);
			exit(json_encode($response));
		}
	}
}
add_action( 'wp_ajax_updateTraveller', 'update_traveller_fields' );

function hotel_booking_requests() {
	$query_args = $_REQUEST;
	if (isset($query_args['hotelid']) && $query_args['hotelid'] != '') {
		$hid = $query_args['hotelid'];
		$hotel_coord = get_field('map_location', $hid);
		if ($hotel_coord) {
			$hotel_lat = $hotel_coord['lat'];
			$hotel_lng = $hotel_coord['lng'];

			$booking_ids = get_nearby_requests($hid, $hotel_lat, $hotel_lng);
			error_log('ok');
			error_log(print_r($booking_ids,true));
		}

		if (get_field('wifi', $hid) != 1) {
			$wifi_args = array(
				'key'	=> 'wifi',
				'value'	=>	0
			);
		}

		if (get_field('breakfast', $hid) != 1) {
			$breakfast_args = array(
				'key'	=> 'breakfast',
				'value'	=>	0
			);
		}

		if (get_field('pool', $hid) != 1) {

			$pool_args = array(
				'key'	=> 'pool',
				'value'	=>	0
			);
		}

		if (get_field('stars', $hid)) {
			$stars_args = array(
				'key'	=> 'stars',
				'value'	=>	get_field('stars', $hid),
				'compare' => '<='
			);
		}

		$claimed_args = array (
			'post_type'              => array( 'booking' ),
			'posts_per_page'         => '5',
			'post__in'			=>	$booking_ids,
			'meta_key'			=> 'offer_timeout',
			'orderby'			=> 'meta_value_num',
			'order'				=> 'ASC',
			'meta_query'             => array(
				'relation'		=>	'AND',
				array(
					'key'       => 'status',
					'value'     => 1
				),
				array(
					'key'       => 'claimed_by_hotel',
					'value'     => $hid,
					'compare'	=> '!='
				),
				$wifi_args,
				$breakfast_args,
				$pool_args,
				$stars_args
			),
		);

		$claimed_booking_query = new WP_Query( $claimed_args );

		$return_data = array();
		$lost_bookings = array();
		$avail_bookings = array();

		if ( $claimed_booking_query->have_posts() ) {

			while ($claimed_booking_query->have_posts()) {
				$claimed_booking_query->the_post();

				$lost_bookings[] = array(
					'reference'	=> get_field('references'),
					'check_in_date'	=> date("l, j M", strtotime(get_field('check_in_date'))),
					'check_out_date'	=> date("l, j M", strtotime(get_field('check_out_date'))),
					'persons'	=> get_field('persons'),
					'single_room'	=> get_field('single_room'),
					'double_room'	=> get_field('double_room'),
					'triple_room'	=> get_field('triple_room'),
					'price'	=> get_field('price'),
					'status'	=> 'claimed'
				);

			}

			$return_data['lost_bookings'] = $lost_bookings;
		}
		wp_reset_postdata();


		//Get Hotel Available Bookings

		// WP_Query arguments
		$args = array (
			'post_type'              => array( 'booking' ),
			'posts_per_page'         => '-1',
			'post__in'			=>	$booking_ids,
			'meta_key'			=> 'offer_timeout',
			'orderby'			=> 'meta_value_num',
			'order'				=> 'ASC',
			'meta_query'             => array(
				'relation'		=>	'AND',
				array(
					'key'       => 'status',
					'value'     => 0
				),
				array(
					'key'       => 'offer_timeout',
					'value'     => date('YmdHis'),
					'compare'	=> '>'
				),
				// $wifi_args,
				// $breakfast_args,
				// $pool_args,
				// $stars_args
			),
		);

		// The Query
		$booking_query = new WP_Query( $args );

		if ($query_args['only_count'] == 'true') {
			$return_data['count'] = $booking_query->found_posts;
			exit(json_encode($return_data));
		}


		if ( $booking_query->have_posts() ) {
			while ($booking_query->have_posts()) {
				$booking_query->the_post();

				$trav_meta = get_userdata(get_the_author_id());
				$reg_date = date('d/m/Y', strtotime($trav_meta->user_registered) );


				$avail_bookings[] = array(
					'id'		=> get_the_ID(),
					'references'	=> get_field('references'),
					'offer_timeout'	=> get_field('offer_timeout'),
					'check_in_date'	=> date("l, j M", strtotime(get_field('check_in_date'))),
					'check_out_date'	=> date("l, j M", strtotime(get_field('check_out_date'))),
					'persons'	=> get_field('persons'),
					'single_room'	=> get_field('single_room'),
					'double_room'	=> get_field('double_room'),
					'triple_room'	=> get_field('triple_room'),
					'price'	=> get_field('price'),
					'traveler_claimed'	=> get_usermeta(get_the_author_id(), 'claimed_requests') ? get_usermeta(get_the_author_id(), 'claimed_requests'):0,
					'traveler_total'	=> get_usermeta(get_the_author_id(), 'total_requests') ? get_usermeta(get_the_author_id(), 'total_requests'):0,
					'traveler_reg'		=> $reg_date,
					'author'			=> get_the_author_id(),
					'status'	=> 'unclaimed'
				);

			}

			$return_data['avail_bookings'] = $avail_bookings;
		}

		wp_reset_postdata();

		exit(json_encode($return_data));

	}
	else {
		exit(false);
	}
}
add_action( 'wp_ajax_hotelBookReq', 'hotel_booking_requests' );


function claim_booking666() {
	$query_args = $_REQUEST;

	if (isset($query_args['hotelid'], $query_args['bookid'], $query_args['token'], $query_args['user_id']) && $query_args['hotelid'] != '' && $query_args['bookid'] != '' && $query_args['token'] != '') {

		$hotel_id = $query_args['hotelid'];
		$book_id = $query_args['bookid'];
		$token = $query_args['token'];
		$user_id = $query_args['user_id'];
		if ( get_field('status', $book_id)  == 0 ) {

			$ver_token = md5($book_id.''.get_field('references', $book_id).''.get_field('offer_timeout', $book_id));
			//exit($ver_token);
			//exit(get_field('offer_timeout', $book_id) . '-' . date('YmdHis'));
			if (date('YmdHis') < get_field('offer_timeout', $book_id)) {
				if ($token == $ver_token) {

					$traveler_id = get_post_field( 'post_author', $book_id );
					update_field("claimed_by_user", $user_id, $book_id);
	            	update_field("claimed_by_hotel",$hotel_id, $book_id);
	            	update_field("status",1,$book_id);
	            	wp_update_post( get_post($book_id) );
	            	//Get previus user revenue and add this booking
	            	$user_revenue = get_usermeta($traveler_id, 'total_revenue');
	            	$user_revenue = $user_revenue + get_field('price');
	            	update_user_meta($traveler_id, 'total_revenue', $user_revenue);
	            	//Get previus user claimed bookings and add this booking
	            	$user_bookings = get_usermeta($traveler_id, 'claimed_requests');
					$user_bookings++;
					update_user_meta($traveler_id, 'claimed_requests', $user_bookings);



// 					create order

					update_field("payment_status","failure", $book_id);// init as failure (we will change it only on success transaction
					update_field("payment_message","[system failure] Payment Failed: init", $book_id);

					$commission = floatval( get_field("commission_for_advanced_payment", 'option') );

					$viva_amount = (floatval(get_field('price', $book_id))*100) * ($commission/100); //get 10% of total value

					$transaction_id = viva_recurringTransaction(get_field('transaction_id', $book_id),$viva_amount,get_field('references', $book_id),$hotel_id);

					if(!$transaction_id){
						//we couldent charge the user! handle this!

						update_field('system_payment_status', 'charge_error', $book_id);
						update_field("payment_message","[user failure] Payment Failed: coulden't charge user's card ", $book_id);

						//register following filter to handle this event (ex: send emails)
						apply_filters( 'vp_bookingSuccesfullyOwnedButNotPaid', $book_id );

						exit('success');//hotel owner doesn't care for payment errors

					}
					else{
						//Transaction is ok, let's investigate!


						$transaction = viva_getTransaction($transaction_id)[0];

						//lets overide the transaction_id with the new one that noone can recharge!
						update_post_meta($book_id, 'transaction_id', $transaction_id);

						update_post_meta($book_id, 'paid_amount', $transaction->Amount );

						update_post_meta($book_id, 'card_Number', $transaction->CreditCard->Number );
						update_post_meta($book_id, 'card_lastdigits', substr($transaction->CreditCard->Number, -4) );
						update_post_meta($book_id, 'card_CountryCode', $transaction->CreditCard->CountryCode );
						update_post_meta($book_id, 'card_IssuingBank', $transaction->CreditCard->IssuingBank );
						update_post_meta($book_id, 'card_CardHolderName', $transaction->CreditCard->CardHolderName );
						update_post_meta($book_id, 'card_ExpirationDate', $transaction->CreditCard->ExpirationDate );
						update_post_meta($book_id, 'card_type', $transaction->CreditCard->CardType->Name );

						update_post_meta($book_id, 'payment_status', $transaction->StatusId );
						update_post_meta($book_id, 'order_id', $transaction->Order->OrderCode );

						$viva_staus = array(
							'E'  => 'The transaction was not completed because of an error',
						    'A'  => 'The transaction is in progress',
						    'M'  => 'The cardholder has disputed the transaction with the issuing Bank',
						    'MA' => 'Dispute Awaiting Response',
						    'MI' => 'Dispute in Progress',
						    'ML' => 'A disputed transaction has been refunded (Dispute Lost)',
						    'MW' => 'Dispute Won',
						    'MS' => 'Suspected Dispute',
						    'X' => 'The transaction was cancelled by the merchant',
						    'R'  => 'The transaction has been fully or partially refunded',
						    'F'  => 'The transaction has been completed successfully'
					    );

						update_post_meta($book_id, 'payment_message', $viva_staus[ $transaction->StatusId ] );

						if($transaction->StatusId == 'F'){
							update_field('system_payment_status', 'charge_complete', $book_id);
						}
						else{
							update_field('system_payment_status', 'charge_error', $book_id);
						}

						//register following filter to handle this event (ex: send emails)
						apply_filters( 'vp_bookingSuccesfullyOwnedAndPaid', $book_id );
					}




					exit('success');
				}
				else {
					exit('error');
				}
			}
			else {
				exit('expired');
			}

		}
		else {
			exit('claimed');
		}

	}
	else {
		exit('error');
	}
}
add_action( 'wp_ajax_claimBooking666', 'claim_booking666' );

function claim_dash_travelers() {
	$query_args = $_REQUEST;
	//exit('df:' . $query_args['datefrom'] . '-dt:' . $query_args['dateto'] . '-hid:' . $query_args['hotelid']);
	if (isset($query_args['datefrom'], $query_args['dateto'], $query_args['hotelid']) && $query_args['datefrom'] != '' && $query_args['dateto'] != '' && $query_args['hotelid'] != '') {
		if (!isset($query_args['date_format']) || $query_args['date_format'] == '') {
			$date_format = "d/m";
		}
		else {
			$date_format = $query_args['date_format'];
		}
		// WP_Query arguments
		if ($query_args['request_type'] == 'week') {
			$args = array (
				'post_type'              => array( 'booking' ),
				'posts_per_page'         => '-1',

				'meta_query'             => array(

					array(
						'key'       => 'check_in_date',
						'value'     => array($query_args['datefrom'], $query_args['dateto']),
						'compare'	=> 'BETWEEN'
					)
				),
			);
		}
		else if ($query_args['request_type'] == 'current') {
			$args = array (
				'post_type'              => array( 'booking' ),
				'posts_per_page'         => '-1',

				'meta_query'             => array(
					'relation'		=>	'AND',
					array(
						'key'       => 'check_out_date',
						'value'     => date('Ymd'),
						'compare'	=> '<='
					),
					array(
						'key'       => 'check_in_date',
						'value'     => date('Ymd'),
						'compare'	=> '>='
					)
				),
			);
		}
		else {
			$args = array (
				'post_type'              => array( 'booking' ),
				'posts_per_page'         => '-1',

				'meta_query'             => array(
					'relation'		=>	'AND',
					array(
						'key'       => 'claimed_by_hotel',
						'value'     => $query_args['hotelid']
					),
					array(
						'key'       => 'check_in_date',
						'value'     => array($query_args['datefrom'], $query_args['dateto']),
						'compare'	=> 'BETWEEN'
					)
				),
			);
		}


		// The Query
		$booking_query = new WP_Query( $args );

		$count  = $booking_query->post_count;
		$travelers = array();

		$total_revenue = 0;
		$total_persons = 0;

		if ( $booking_query->have_posts() ) {
			//exit('okkkkkkkkk');
			while ($booking_query->have_posts()) {
				$booking_query->the_post();

/*
				$trav_meta = get_userdata(get_the_author_id());
				$reg_date = date('d/m/Y', strtotime($trav_meta->user_registered) );
*/
				$total_revenue = $total_revenue + get_field('price');
				$total_persons = $total_persons + get_field('persons');

				$travelers[] = array(
					'id'		=> get_the_ID(),
					'references'	=> get_field('references'),
					'offer_timeout'	=> get_field('offer_timeout'),
					'check_in_date'	=> date($date_format, strtotime(get_field('check_in_date'))),
					'check_out_date'	=> date($date_format, strtotime(get_field('check_out_date'))),
					'persons'	=> get_field('persons'),
					'price'	=> get_field('price'),
					'telephone'	=> get_field('telephone'),
					'email'	=> get_field('email'),
					'first_name' => get_field('first_name'),
					'last_name' => get_field('last_name'),
				);

			}

			$return_data['travelers'] = $travelers;
			$return_data['stats'] = array(
				'revenue'	=> $total_revenue,
				'persons'	=> $total_persons,
				'requests'	=> $count
			);
		}

		wp_reset_postdata();

		exit(json_encode($return_data));

	}
	else {
		exit('false');
	}


}
add_action( 'wp_ajax_travelerStay', 'claim_dash_travelers' );

function manageBooking() {
	$query_args = $_REQUEST;
	if (!isset($query_args['reference'], $query_args['email'])) {
		exit('missing data');
	}

	// WP_Query arguments
	$args = array (
		'post_type'              => array( 'booking' ),
		'meta_query'             => array(
			'relation' => 'AND',
			array(
				'key'       => 'references',
				'value'     => $query_args['reference'],
			),
			array(
				'key'       => 'email',
				'value'     => $query_args['email'],
			),
		),
	);
	// The Query
	$the_query = new WP_Query( $args );

	if ( $the_query->have_posts() ) {
		while ( $the_query->have_posts() ) {
			$the_query->the_post();
			//echo $the_query->the_post();
			$post_id = get_the_id();

			$offer_timeout = strtotime(get_post_meta($post_id, 'offer_timeout', true));
			$time_now = time();

			$time_diff = $offer_timeout - $time_now;

			$booking_data = array(
				'id'	=> $post_id,
				'hash'	=> get_post_meta($post_id, 'hash_code', true),
				'price'	=> get_field('price', $post_id),
				'status'	=> get_post_meta($post_id, 'status', true),
				'room_price'	=> get_field("roomNightPrice", $post_id),
				'city'	=> get_field("address", $post_id),
				'country'	=> get_field('country', $post_id),
				'checkin'	=> date('M d, Y', strtotime(get_field("check_in_date", $post_id))),
				'checkout'	=> date('M d, Y', strtotime(get_field("check_out_date", $post_id))),
				'persons'	=> get_field("persons", $post_id),
				'double_rooms'	=> get_field("double_room", $post_id),
				'stars'	=> get_field("stars", $post_id),
				'wifi'	=> (get_field("wifi", $post_id) == 0) ? 'No' : 'Yes',
				'pool'	=> (get_field("pool", $post_id) == 0) ? 'Not required' : 'Required',
				'expires_in_secs'	=> $time_diff,
				'card'	=> get_field('card_Number', $post_id),
				'card_last_digits'	=> get_field('card_lastdigits', $post_id),
				'payment_status'	=> get_field('system_payment_status', $post_id)

			);
		}
		exit(json_encode($booking_data));
	}
	exit('booking not found');

}
add_action( 'wp_ajax_nopriv_manageBooking', 'manageBooking' );

function cancelBooking() {
	$query_args = $_REQUEST;
	if ($_REQUEST['action']=='cancelBooking'){
		if(isset($_GET['id']) && isset($_GET['hash'])){
			$reference = get_field('references', $_GET['id']);
			$price = get_field('price', $_GET['id']);
			$persons = get_field('persons', $_GET['id']);
			$check_in_date = get_field('check_in_date', $_GET['id']);
			$check_out_date = get_field('check_out_date', $_GET['id']);
			$user = get_field('author', $_GET['id']);

			$c_hash=md5($reference.$price.$persons.$check_in_date.$check_out_date.$user);
			if($_GET['hash'] == $c_hash){
				update_field('status', 3, $_GET['id']);
				$post_id = $_GET['id'];
			}
			exit('cancelled');
		}
	}
	exit('missing data');


}
add_action( 'wp_ajax_nopriv_cancelBooking', 'cancelBooking' );
