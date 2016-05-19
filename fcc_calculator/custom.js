	var display = "";
	var calc_array = [];

	var calculate = function() {
		var calculate_now = new Function("return 0");
		var function_code = "return " + calc_array.join('');
		var result = 0;

		calculate_now = new Function( function_code );
		display_init();
		result = calculate_now();
		$(".calc_display_text").text( result );
		calc_array = [];
		calc_array[0] = result;
	}

	var display_init = function() {
		$(".calc_display_text").text("");
		calc_array = [];
	}

	var display_update = function( button_val ) {
		if ( calc_array.length > 0 )
			if ( button_val	=== '+' || button_val	=== '/' || button_val === '*' )
				if ( calc_array[ calc_array.length - 1 ] === '+' || calc_array[ calc_array.length - 1 ] === '-' || calc_array[ calc_array.length - 1 ]	=== '/' || calc_array[ calc_array.length - 1 ] === '*' )
					calc_array.pop();
			
		calc_array.push( button_val );
		var display_text = calc_array.join('');
		$(".calc_display_text").text( display_text );
	}

	display_init();
