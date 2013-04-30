function diffSection(source,diff){
	var api={};
	$(source).html($(source).html().toString().replace(/\n/g, ' ').replace(/\s+/g, " "));
	var testDiff= $(diff);
	$(testDiff).html();
	$(diff).html($(diff).html().toString().replace(/\n/g, ' ').replace(/\s+/g, " "));
	$(source+" br").replaceWith("\r");
	$(diff+" br").replaceWith("\r");
	api.source=$(source).text();
	api.diff=$(diff).text();
	api.mode="diff";
	api.lang="auto";
	api.sourcelabel="original";
	api.force_indentation=true;
	api.difflabel="county";
	var html = prettydiff(api);
	$("#result").html(html.toString());
	$(source).html("<table class='diff'><tbody></tbody></table>");
	$(diff).html("<table class='diff'><tbody></tbody></table>");
	$("#result table.diff tbody tr").each(function(){
		var htmlstring1 = "<tr><td class="+$(this).find("td:eq(0)").attr('class')+">"+$.trim($(this).find("td:eq(0)").html().toString())+"</td></tr>";
		var htmlstring2 = "<tr><td class="+$(this).find("td:eq(1)").attr('class')+">"+$.trim($(this).find("td:eq(1)").html().toString())+"</td></tr>";
		$(source+" .diff tbody").append(htmlstring1);
		$(diff+" .diff tbody").append(htmlstring2);
	});
	$('.diff tbody tr td:empty').html('&nbsp;');
	$("#result").html("");
}