function echo(st)
{
	document.write(st);
}
function Element(id)
{
	if(typeof(id)=='object')
	{
		return id;
	}
	return document.getElementById(id);
}
function select_all_checkbox(form,name,status, select_color, unselect_color, element_name)
{
	if(element_name!='' && typeof(element_name)!='undefined'){
		for (var i = 0; i < form.elements.length; i++) {
			if (form.elements[i].name == element_name) {
				if(status==-1)
				{
					form.elements[i].checked = !form.elements[i].checked;
				}
				else
				{
					form.elements[i].checked = status;
				}
				if(select_color)
				{
					if(Element(name+'_tr_'+form.elements[i].value))
					{
						Element(name+'_tr_'+form.elements[i].value).style.backgroundColor=form.elements[i].checked?select_color:unselect_color;
					}
				}
			}
		}
	}else{
		for (var i = 0; i < form.elements.length; i++) {
			if(status==-1)
			{
				form.elements[i].checked = !form.elements[i].checked;
			}
			else
			{
				form.elements[i].checked = status;
			}
			if(select_color)
			{
				if(Element(name+'_tr_'+form.elements[i].value))
				{
					Element(name+'_tr_'+form.elements[i].value).style.backgroundColor=form.elements[i].checked?select_color:unselect_color;
				}
			}
		}
	}
}
function select_checkbox(form, name, checkbox, select_color, unselect_color)
{
	tr_color = checkbox.checked?select_color:unselect_color;
	if(typeof(event)=='undefined' || !event.shiftKey)
	{
		Element(name+'_all_checkbox').lastSelected = checkbox;
		if(select_color && Element(name+'_tr_'+checkbox.value))
		{
			Element(name+'_tr_'+checkbox.value).style.backgroundColor=checkbox.checked?select_color:unselect_color;
		}
		update_all_checkbox_status(form, name);
		return;
	}
	//select_all_checkbox(form, name, false, select_color, unselect_color);
	
	var active = typeof(Element(name+'_all_checkbox').lastSelected)=='undefined'?true:false;
	
	for (var i = 0; i < form.elements.length; i++) {
		if (!active && form.elements[i]==Element(name+'_all_checkbox').lastSelected)
		{
			active = 1;
		}
		if (!active && form.elements[i]==checkbox)
		{
			active = 2;
		}
		if (active && form.elements[i].id == name+'_checkbox') {
			form.elements[i].checked = checkbox.checked;
			Element(name+'_tr_'+form.elements[i].value).style.backgroundColor=
				checkbox.checked?select_color:unselect_color;
		}
		if(active && (form.elements[i]==checkbox && active==1) || (form.elements[i]==Element(name+'_all_checkbox').lastSelected && active==2))
		{
			break;
		}
	}
	update_all_checkbox_status(form, name);
}
function update_all_checkbox_status(form, name)
{
	var status = true;
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].name == 'selected_ids[]' && !form.elements[i].checked) {
			status = false;
			break;
		}
	}
	Element(name+'_all_checkbox').checked = status;
}
/* Tạo ra đồng hồ trong thẻ có id là "clockspot"
*/
function start_clock()
{
	var thetime=new Date();
	var nhours=thetime.getHours();
	var nmins=thetime.getMinutes();
	var nsecn=thetime.getSeconds();
	var nday=thetime.getDay();
	var nmonth=thetime.getMonth();
	var ntoday=thetime.getDate();
	var nyear=thetime.getYear();
	var AorP=" ";
	if (nhours>=12)
		AorP="P.M.";
	else
		AorP="A.M.";
	if (nhours>=13)
		nhours-=12;
	if (nhours==0)
	   nhours=12;
	if (nsecn<10)
	 nsecn="0"+nsecn;
	if (nmins<10)
	 nmins="0"+nmins;
	Element('clockspot').innerHTML=nhours+": "+nmins+": "+nsecn+" "+AorP;
	setTimeout('start_clock()',1000);
}
/* In nội dung trong thẻ có id là tham số tagid
*/
function printWebPart(tagid){
    if (tagid && document.getElementById(tagid)) {
		//build html for print page
		if(jQuery("#"+tagid).attr('type')=='land')
		{
			var content = '<div style="page:land;">';
			content += jQuery("#"+tagid).html();
			content += '</div>';
		}else{
        	var content = jQuery("#"+tagid).html();			
		}
		//alert(content);
		var html = "<HTML>\n<HEAD>\n"+
            jQuery("head").html()+
            "\n</HEAD>\n<BODY class='print-bound'>\n"+
            content+
            "\n</BODY>\n</HTML>";
        //open new window
        //alert(html);
		//html = html.replace(/<TITLE>((.|[\r\n])*?)<\\?\/TITLE>/ig, "");
		//html = html.replace(/<script[^>]*>((.|[\r\n])*?)<\\?\/script>/ig, "");
		var printWP = window.open("","printWebPart");
        printWP.document.open();
        //insert content
        printWP.document.write(html);
        printWP.document.close();
        //open print dialog
        printWP.print();
    }
}
/* Xóa khoảng trắng thừa
*/
function  __trim(str){
	str = str.replace(/\s+\s+/g,' ');
	return str.replace(/^\s+|\s+Element/g,'');
}
/* Xóa thẻ html trong ô input dạng text
*/
function checkInput(id){
	id=(!id || typeof(id)=='undefined')?'':'#'+id+' ';
	jQuery(id+'input[type=text]').each(function(){
		var value = jQuery(this).val();
		value = value.replace(/&(lt|gt);/g, function (strMatch, p1){
 		 	return (p1 == "lt")? "<" : ">";
 		});
		value = __trim(value.replace(/<\/?[^>]+(>|Element)/g, ""));
		jQuery(this).val(value);
	});
}
/* Kiểm tra khi người dùng nhấn enter
** có 3 tham số e, fn và params: e - phím người dùng bấm. fn - là hàm sẽ gọi khi người dùng nhấn Enter. params - là tham số của hàm fn
** khi có sự kiện onkeypress thì gọi hàm checkEnter
*/
function checkEnter(e,fn,prams){
	if(window.event)
	  key = window.event.keyCode;     //IE
	else
	  key = e.which;     //firefox
	if(key == 13){
		if(prams=='' || typeof(prams)=='undefined'){
			prams='';
		}
		eval(fn+'('+prams+');');
	}
}
/* Lấy nội dung form bằng ajax
** Lưu ý khi muốn load lại nội dung form cần truyền đầy đủ tham số Element_REQUEST để form hiển thị đầy đủ.
*/
function ajaxForm(prams,block_id,id){
	jQuery.ajax({
		method: "POST",url: 'form.php?block_id='+block_id,
		data : prams,
		beforeSend: function(){
		},
		success: function(content){
			if(id!='' && typeof(id)!='undefined'){
				document.getElementById(id).outerHTML=content;
			}
		}
	});
}
/* Kiểm tra giá trị bằng ajax
** block_id là block_id của vùng chứa module
** data là tham số truyền đi
** giá trị trả về là content
*/
function check_ajax(block_id,data){
	return jQuery.ajax({
		method: "POST",
		async: false,
		url: 'form.php?block_id='+block_id,
		data : data,
		success: function(content){
			return content;
		}
	}).responseText;
}
/* Khi submit form gặp error check,
** chuyển những phần bị lỗi sang border mầu đỏ
*/
function notify_errors(data){
	if(data.length>0){
		for(i=0;i<data.length;i++){
			if(jQuery('#'+data[i]).length > 0){
				Element(data[i]).style.border="1px solid red";
			}
		}
	}
}
/* js check validate có lỗi
** Chuyển phần tử có id sang định dạng khác
** Hiện error dưới phần tử id
*/ 
function __validate(id,error){
	if(typeof(id)!='undefined' && id!=''){
		if(!jQuery('#'+id).next().hasClass('notify-error')){
			jQuery('#'+id).addClass('input-error');
			if(typeof(error)!='undefined' && error!=''){
				jQuery('#'+id).after('<div class="notify-error">'+error+'</div>');
			}
		}else{
			if(typeof(error)!='undefined' && error!=''){
				jQuery('#'+id).next().remove();
				jQuery('#'+id).after('<div class="notify-error">'+error+'</div>');
			}
		}
		jQuery('.notify-error').first().prev().focus();
	}
}
/* ids là danh sách các id cách nhau bởi dấu phẩy ","
** Trả về trạng thái ban đầu cho id nếu valid
*/
function remove_error(id){
	jQuery('#'+id).removeClass('input-error').next().remove();
}
function __valid(ids){
	if(typeof(ids)!='undefined' && ids!=''){
		var n=ids.split(',');
		for(i=0;i<n.length;i++){
			var id=n[i];
			if(typeof(id)!='undefined' && id!='' && jQuery('#'+id).next().hasClass('notify-error')){
				jQuery('#'+id).css({
					'border':'1px solid #ccc',
					'background-color':'#fff'
				});
				jQuery('#'+id).next().remove();
			}
		}
	}
}
/* Chuyển sang trang url
** Nếu không có url thì quay lại trang trước
*/
function goto(url){
	if(url!='' && typeof(url)!='undefined'){
		window.location = url;
	}else{
		window.history.go(-1);
	}
}
function openWindowUrl(url,data)
{
	var id = 'new_window';
	var title = '';
	var top = 88;
	var left = 212;
	var width = 600;
	var height = 400
	if(data[0]){
		id = data[0];	
	}
	if(data[1]){
		title = data[1];	
	}
	if(data[2]){
		top = data[2];	
	}
	if(data[3]){
		left = data[3];	
	}
	if(data[4]){
		width = data[4];	
	}
	if(data[5]){
		height = data[5];	
	}
	jQuery.newWindow({
		id:id,
		title:title,
		content:"",
		posx:left,
		posy:top,
		width:width,
		height:height
	});
	jQuery.updateWindowContentWithUrl(id,url);
}