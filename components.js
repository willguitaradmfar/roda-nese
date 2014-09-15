var templates = {};

templates.inputForm = (function () {

	var templ = '<div class="input-group component col-md-$largura$">'
					+'<label>$label$</label>'
					+'<input type="text" class="form-control" placeholder="$placeholder$">'
				+'</div>';
	return {
		'templ' : templ
	};
})();

templates.buttonForm = (function () {

	var templ = '<div class="input-group component col-md-$largura$">'					
					+'<button type="submit" class="btn btn-default">Submit</button>'
				+'</div>';
	return {
		'templ' : templ
	};
})();