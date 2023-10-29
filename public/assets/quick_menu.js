jQuery(function(){
	jQuery('button#add').click(function(){
		if(strpos(window.location,'?')){
			location = window.location+'&cmd=add';
		}else{
			location = window.location+'?cmd=add';
		}
	});
	jQuery('button#delete').click(function(){
		if(check_selected()){
			if(confirm('Bạn muốn xóa không?')){
				var cmd=jQuery(this).attr('cmd')?jQuery(this).attr('cmd'):'delete';
				var form = get_form();
				make_cmd(cmd);
				if (typeof FormSubmit == 'function') { 
				  FormSubmit(); 
				}
				form.submit();
			}
		}else{
			alert('Hãy chọn bản ghi cần xóa'); return false;
		}
	});
	jQuery('button#save').click(function(){
		var form = get_form();
		make_cmd("");
		if (typeof FormSubmit == 'function') { 
		  FormSubmit(); 
		}
		form.submit();
	});
	jQuery('button#save_continue').click(function(){
		var form = get_form();
		make_action("continue");
		if (typeof FormSubmit == 'function') { 
		  FormSubmit(); 
		}
		form.submit();
	});
	jQuery('button#save_edit').click(function(){
		var form = get_form();
		make_cmd('edit');
		if (typeof FormSubmit == 'function') { 
		  FormSubmit(); 
		}
		form.submit();
	});
	jQuery('button#save_add').click(function(){
		if(check_selected()){
			var form = get_form();
			make_cmd("");
			form.submit();
		}else{
			alert('Hãy chọn ít nhất một bản ghi'); return false;
		}
	});
	jQuery('button#update').click(function(){
		if(check_selected()){
			if(confirm('Bạn có chắc chắn không?')){
				var form = get_form();
				make_cmd('update');
				form.submit();
			}
		}else{
			alert('Hãy chọn ít nhất một bản ghi'); return false;
		}
	});
	jQuery('button#back').click(function(){
		window.history.go(-1);
	});
	jQuery('button#print').click(function(){
		print_form();
	});
});
function get_form()
{
	if(document.forms.length>=1)
	{
		return document.forms[0];
	}
	return false;
}
function make_cmd(cmd)
{
	if(document.getElementById('cmd') && typeof(document.getElementById('cmd'))=='object')
	{
		document.getElementById('cmd').value = cmd;
	}
}
function make_action(action)
{
	if(document.getElementById('action') && typeof(document.getElementById('action'))=='object')
	{
		document.getElementById('action').value = action;
	}
}
function strpos (haystack, needle, offset) {
  var i = (haystack+'').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}
function check_selected()
{	
	var status = false;
	var __class_checkbox = '';
	if(jQuery('.selected_ids').length > 0) __class_checkbox='.selected_ids';
	jQuery('form '+__class_checkbox+':checkbox').each(function(e){
		if(this.disabled == false && this.checked)
		{
			status = true;
		}
	});
	return status;
}
function print_form()
{
	if(jQuery('#printer_bound')){
		printWebPart('printer_bound');
	}else{
		alert('Không tạo được trang cần in');	
	}
}
function delete_image(block_id,data,remove){
	jQuery.ajax({
		method: "POST",
		url: 'form.php?block_id='+block_id,
		data : data,
		success: function(content){
			jQuery('.'+remove).remove();
		}
	});
}
