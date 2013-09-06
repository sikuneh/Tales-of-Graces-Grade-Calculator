const CHECKBOX_EL_INDEX = 0;
const NAME_EL_INDEX = 1;
const COST_EL_INDEX = 2;
const DESC_EL_INDEX = 3;

var GradeShop = function()
{
	// Data members
	var initial_grade = 0,
		remaining_grade = 0,
		list_of_bonuses = Array();
		
	this.setInitialGrade = function(temp_initial_grade)
	{
		initial_grade = temp_initial_grade;
		remaining_grade = temp_initial_grade;
		document.getElementById("summary_list").innerHTML = "";
		displayRemainingGrade();
		disableInvalidRows();
		resetChecks();
		list_of_bonuses.length = 0;
	}
	
	this.calculateGrade = function(row)
	{
		if (row.getElementsByClassName("gradeshop_checkbox")[CHECKBOX_EL_INDEX].firstChild.checked)
		{
			//remaining_grade -= parseInt(row.getElementsByClassName("gradeshop_cost")[0].textContent);
			remaining_grade -= parseInt(row.childNodes[COST_EL_INDEX].textContent);
			row.className = "gradeshop_item selected";
			//list_of_bonuses.push(row.getElementsByClassName("gradeshop_name")[0].textContent);
			list_of_bonuses.push(row.childNodes[NAME_EL_INDEX].textContent);
		}
		else
		{
			remaining_grade += parseInt(row.getElementsByClassName("gradeshop_cost")[0].textContent);
			row.className = "gradeshop_item";
			for (i = 0; i < list_of_bonuses.length; i++)
			{
				if (list_of_bonuses[i] == row.getElementsByClassName("gradeshop_name")[0].textContent)
					list_of_bonuses.splice(i, 1);
			}
		}
		displayRemainingGrade();
		disableInvalidRows();
		updateSummary();
	}
	
	var displayRemainingGrade = function()
	{
		document.getElementById("remaining_grade").value = "";
		document.getElementById("remaining_grade").value = remaining_grade;
		if (remaining_grade < 0)
			document.getElementById("remaining_grade").style.background = "red";
		else
			document.getElementById("remaining_grade").style.background = "#DDDDDD";
	}
	
	var updateSummary = function()
	{
		var i = 0;
		
		document.getElementById("summary_list").innerHTML = "";
		
		for (i = 0; i < list_of_bonuses.length; i++)
			document.getElementById("summary_list").innerHTML += "<li>" + list_of_bonuses[i] + "</li>";
	}
	
	// Todo:

	var disableInvalidRows = function()
	{
		var item_rows = document.getElementsByClassName("gradeshop_item"),
			i = 0;
		
		for (i = 0; i < item_rows.length; i++)
		{
			item = item_rows[i];
			if ((remaining_grade - parseInt(item.getElementsByClassName("gradeshop_cost")[0].textContent)) < 0
				&& item.className != "gradeshop_item selected")
			{
				item.className = "gradeshop_item invalid";
				item.getElementsByClassName("gradeshop_checkbox")[0].childNodes[0].disabled = true;
			}
			else if (item.className == "gradeshop_item selected") {}
			else
			{
				item.className = "gradeshop_item";
				item.childNodes[CHECKBOX_EL_INDEX].firstChild.disabled = false;
			}
		}
	}
}

function resetChecks()
{
	var checks = document.getElementsByTagName("input"),
		i = 0;
		
	for (i = 0; i < checks.length; i++)
	{
		if (checks[i].type == "checkbox")
		{
			checks[i].checked = false;
			checks[i].parentNode.parentNode.className = "gradeshop_item";
		}
	}
}

window.onload = resetChecks;