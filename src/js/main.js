$(document).ready(function(){
		$.ajax({
			url:"/data/header.json",
			dataType: "json",
			type:"GET",
			success: function(data){
				if(data) {
					var src,
						template;

					src = $('#header').html();
					template = Handlebars.compile(src);
					$('body').prepend(template());
				}
			},
			error:function(data){
				console.info(data);
			}
		});

		/*$.getJSON("/data/header.json",function(data){
			alert('hi');
			
		});*/

		$('#main').
		find('a').
		colorbox({
			'rel':'gallery',
			'width': '80%',
			'current':'Adjustment {current} of {total}',
			'transition':'fade',
			'opacity':'0.6',
			'slideshow':'true',
			'slideshowSpeed':'3000',
			'slideshowAuto':'true'
		});


		
});