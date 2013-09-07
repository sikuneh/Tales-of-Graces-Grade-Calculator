//----------------------------------------------------------------------------
// 	File Name:		gradeshop.js
//
//	Functions:		GradeShop
//					setInitialGrade
//					calculateGrade
//					displayRemainingGrade
//					updateSummary
//					disableInvalidRows
//					resetChecks
//					removeFromBonuses
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//	Global Constants
//----------------------------------------------------------------------------
const CHECKBOX_EL_INDEX = 0;
const NAME_EL_INDEX = 1;
const COST_EL_INDEX = 2;
const DESC_EL_INDEX = 3;

//----------------------------------------------------------------------------
//	Title:			GradeItem
//
//	Author:			Nick Williams
//
//	Description:	The GradeItem class definition
//
//	Date:			09/07/13
//
//	Date Modified:
//
//	Methods:		getName
//					getMode
//					switchMode
//
//	Data Members:	initialGrade
//					remaining_grade
//					list_of_bonuses
//----------------------------------------------------------------------------
var GradeItem = function(name, mode)
{	
	var item_name,
		item_mode;
	
	item_name = name;
	item_mode = typeof mode !== 'undefined' ? mode : false;
	
	this.getName = function() { return item_name; }
	this.getMode = function() { return item_mode; }
	
	this.switchMode = function(hardSwitch) 
	{ 
		item_mode = typeof hardSwitch !== 'undefined' ? hardSwitch : !item_mode;
	}
}

//----------------------------------------------------------------------------
//	Title:			GradeShop
//
//	Author:			Nick Williams
//
//	Description:	The GradeShop class definition
//
//	Date:			09/05/13
//
//	Date Modified:	09/07/13
//
//	Methods:		setInitialGrade
//					calculateGrade
//					displayRemainingGrade
//					updateSummary
//					disableInvalidRows
//					resetChecks
//					removeFromBonuses
//
//	Data Members:	initialGrade
//					remaining_grade
//					list_of_bonuses
//----------------------------------------------------------------------------
var GradeShop = function()
{
	// Data members
	var initial_grade = 0,
		remaining_grade = 0;
	var	list_of_bonuses = [
			new GradeItem("Inherit Titles"),
			new GradeItem("Inherit Skills"),
			new GradeItem("Inherit Eleth Mixer"),
			new GradeItem("Inherit Gald"),
			new GradeItem("Inherit Stamps"),
			new GradeItem("Inherit Arte Usage"),
			new GradeItem("Inherit Books"),
			new GradeItem("Inherit Shards"),
			new GradeItem("Inherit Herb Bonuses"),
			new GradeItem("Triple EXP for Gald"),
			new GradeItem("Double EXP"),
			new GradeItem("5x EXP"),
			new GradeItem("Half EXP"),
			new GradeItem("Double SP"),
			new GradeItem("Triple SP"),
			new GradeItem("Mastery Bonus"),
			new GradeItem("Double Item Drops"),
			new GradeItem("Dualize Discount"),
			new GradeItem("Upgrade Eleth Mixer"),
			new GradeItem("Expand Inventory"),
			new GradeItem("Movement Speed"),
			new GradeItem("Chain Capacity +1"),
			new GradeItem("Chain Capacity +2"),
			new GradeItem("Double Critical"),
			new GradeItem("Double Damage"),
			new GradeItem("5x Damage"),
			new GradeItem("Double Gald"),
			new GradeItem("Unlock Qualities"),
			new GradeItem("Maximum Eleth +500"),
			new GradeItem("Maximum HP +1000"),
			new GradeItem("Skip Childhood"),
			new GradeItem("Inherit Magic Carta Cards")
		];
	
	//----------------------------------------------------------------------------
	//	Name:			setInitialGrade
	//
	//	Title:			Sets the initial grade
	//
	//	Description:	Like a constructor, sets the initial_grade and 
	//					remaining_grade, resets the summary array, displays the
	//					remainging grade, resets the checks and clears the
	//					summary div
	//
	//	Programmer:		Nick Williams
	//
	//	Date:			09/05/13
	//
	//	Version:		1.1
	//
	//	Environment:	Hardware: Dell Studio 1747 Laptop
	//					Software: Microsoft Windows 7 Ultimate SP1
	//	
	//	Input:			initial grade field
	//	
	//	Output:			Clears summary list
	//					sets remaining_grade field to initial_grade
	//
	//	Called By:		onKeyUp event in initial grade field
	//					oblur even in initial grade field
	//
	//	Calls:			displayRemainingGrade
	//					disableInvalidRows
	//					resetChecks
	//
	//	Parameters:		int temp_initial_grade: the initial grade provided by the user
	//
	//	Returns:		None
	//
	//	History Log:	09/05/13 NW First iteration
	//					09/06/13 NW Several fixes
	//					09/07/13 NW Adapted list_of_bonuses loop to incorporate the new GradeItem class
	//----------------------------------------------------------------------------
	this.setInitialGrade = function(temp_initial_grade)
	{
		var i = 0;
		if (document.getElementById("initial_grade").length == 0)
			temp_initial_grade = 0;
		initial_grade = parseInt(temp_initial_grade);
		remaining_grade = parseInt(temp_initial_grade);
		
		document.getElementById("summary_list").innerHTML = "";
		
		for (i = 0; i < list_of_bonuses.length; i++)
			list_of_bonuses[i].switchMode(false);
		
		displayRemainingGrade();
		disableInvalidRows();
		resetChecks();
	}
	
	//----------------------------------------------------------------------------
	//	Name:			calculateGrade
	//
	//	Title:			Calculates the reamining grade
	//
	//	Description:	Given a row, it checks for a checked checkbox and if it
	//					finds one, it goes to the cost (row[2]) div and subtracts
	//					it from remaining grade. It applies the selected class to
	//					the row and appends the name div to the list_of_bonuses array
	//					Otherwise it adds the cost back to remaining grade and resets
	//					the class back to gradeshop_item. Then loops through the 
	//					list_of_bonuses array and removes 
	//
	//	Programmer:		Nick Williams
	//
	//	Date:			09/05/13
	//
	//	Version:		1.2
	//
	//	Environment:	Hardware: Dell Studio 1747 Laptop
	//					Software: Microsoft Windows 7 Ultimate SP1
	//	
	//	Input:			initial grade field
	//	
	//	Output:			Clears summary list
	//					sets remaining_grade field to initial_grade
	//
	//	Called By:		onKeyUp event in initial grade field
	//					oblur even in initial grade field
	//
	//	Calls:			displayRemainingGrade
	//					disableInvalidRows
	//					resetChecks
	//					removeFromBonuses
	//
	//	Parameters:		int temp_initial_grade: the initial grade provided by the user
	//
	//	Returns:		None
	//
	//	History Log:	09/05/13 NW First iteration
	//					09/06/13 NW Several fixes
	//					09/06/13 NW Removed loop-style list_of_bonuses splice into another
	//								function called removeFromBonuses. Also added recursive
	//								check to make sure remaining_grade cannot go less than 0
	//----------------------------------------------------------------------------
	this.calculateGrade = function(row)
	{
		var item_checkbox = row.childNodes[CHECKBOX_EL_INDEX].firstChild,
			item_name = row.childNodes[NAME_EL_INDEX].textContent,
			item_cost = parseInt(row.childNodes[COST_EL_INDEX].textContent);
		
		if (item_checkbox.checked)
		{
			if (remaining_grade - item_cost < 0)
			{
				item_checkbox.disabled = true;
				row.className = "gradeshop_item invalid";
			}
			else
			{
				remaining_grade -= item_cost;
				row.className = "gradeshop_item selected";
				addToBonuses(item_name);
			}
		}
		else
		{
			remaining_grade += item_cost;
			row.className = "gradeshop_item";
			removeFromBonuses(item_name);
		}
		displayRemainingGrade();
		disableInvalidRows();
		updateSummary();
	}
	
	//----------------------------------------------------------------------------
	//	Name:			addToBonuses
	//
	//	Title:			Add item to bonuses list
	//
	//	Description:	Loops through each item to check for the supplied name and
	//					switch that one on;
	//
	//	Programmer:		Nick Williams
	//
	//	Date:			09/05/13
	//
	//	Version:		1.0
	//
	//	Environment:	Hardware: Dell Studio 1747 Laptop
	//					Software: Microsoft Windows 7 Ultimate SP1
	//	
	//	Input:			item name
	//	
	//	Output:			Removes item from list_of_bonuses
	//
	//	Called By:		calculateGrade
	//
	//	Calls:			N/A
	//
	//	Parameters:		name: the name of a gradeshop_item
	//
	//	Returns:		None
	//
	//	History Log:	09/06/13 NW First iteration
	//----------------------------------------------------------------------------
	function addToBonuses(item_name)
	{
		var i = 0;
		
		for (i = 0; i < list_of_bonuses.length; i++)
		{
			if (list_of_bonuses[i].getName() == item_name)
			{
				list_of_bonuses[i].switchMode();
				break;
			}
		}
	}
	//----------------------------------------------------------------------------
	//	Name:			removeFromBonuses
	//
	//	Title:			Remove item from bonuses list
	//
	//	Description:	Given an item name, searches the list using indexOf and
	//					splices the item at that index
	//
	//	Programmer:		Nick Williams
	//
	//	Date:			09/05/13
	//
	//	Version:		1.0
	//
	//	Environment:	Hardware: Dell Studio 1747 Laptop
	//					Software: Microsoft Windows 7 Ultimate SP1
	//	
	//	Input:			item name
	//	
	//	Output:			Removes item from list_of_bonuses
	//
	//	Called By:		calculateGrade
	//
	//	Calls:			N/A
	//
	//	Parameters:		name: the name of a gradeshop_item
	//
	//	Returns:		None
	//
	//	History Log:	09/06/13 NW First iteration
	//					09/07/13 NW Added break to optimize loop
	//----------------------------------------------------------------------------
	var removeFromBonuses = function(item_name)
	{
		for (i = 0; i < list_of_bonuses.length; i++)
		{
			if (list_of_bonuses[i].getName() == item_name)
			{
				list_of_bonuses[i].switchMode();
				break;
			}
		}
	}
	
	//----------------------------------------------------------------------------
	//	Name:			displayRemainingGrade
	//
	//	Title:			Display the remaining grade in the remaining grade field
	//
	//	Description:	Clears the field then sets the value of remaining_grade as
	//					remaining_grade. If the remaining_grade is < 0 it will turn
	//					red othwerise it changes to a light gray color
	//
	//	Programmer:		Nick Williams
	//
	//	Date:			09/05/13
	//
	//	Version:		1.1
	//
	//	Environment:	Hardware: Dell Studio 1747 Laptop
	//					Software: Microsoft Windows 7 Ultimate SP1
	//	
	//	Input:			N/A
	//	
	//	Output:			Sets remaining_grad field
	//
	//	Called By:		setInitialGrade
	//					calculateGrade
	//
	//	Calls:			N/A
	//
	//	Parameters:		N/A
	//
	//	Returns:		None
	//
	//	History Log:	09/05/13 NW First iteration
	//					09/06/13 NW Several fixes
	//----------------------------------------------------------------------------
	var displayRemainingGrade = function()
	{
		document.getElementById("remaining_grade").value = "";
		document.getElementById("remaining_grade").value = remaining_grade;
		if (remaining_grade < 0)
			document.getElementById("remaining_grade").style.background = "red";
		else
			document.getElementById("remaining_grade").style.background = "#DDDDDD";
	}
	
		//----------------------------------------------------------------------------
	//	Name:			updateSummary
	//
	//	Title:			Update summary div
	//
	//	Description:	Clears the summary_list and loop through each item giving
	//					it a li start and end tag
	//
	//	Programmer:		Nick Williams
	//
	//	Date:			09/05/13
	//
	//	Version:		1.2
	//
	//	Environment:	Hardware: Dell Studio 1747 Laptop
	//					Software: Microsoft Windows 7 Ultimate SP1
	//	
	//	Input:			list_of_bonuses
	//	
	//	Output:			Lists each list_of_bonuses item in an li
	//
	//	Called By:		calculateGrade
	//
	//	Calls:			N/A
	//
	//	Parameters:		N/A
	//
	//	Returns:		None
	//
	//	History Log:	09/05/13 NW First iteration
	//					09/06/13 NW Several fixes
	//					09/06/13 NW Cleaned up code
	//					09/07/13 NW Adapted new list_of_bonuses 
	//----------------------------------------------------------------------------
	var updateSummary = function()
	{
		var i = 0,
			summary_list = document.getElementById("summary_list");
		
		summary_list.innerHTML = "";
		
		for (i = 0; i < list_of_bonuses.length; i++)
		{
			if (list_of_bonuses[i].getMode() == true)
				summary_list.innerHTML += "<li>" + list_of_bonuses[i].getName() + "</li>";
		}
	}
	
	//----------------------------------------------------------------------------
	//	Name:			disableInvalidRows
	//
	//	Title:			Disables invalid rows
	//
	//	Description:	Loops through each item, checks if the cost of that item
	//					would put the remaining_grade below zero, and if it does,
	//					set the row class as invalid and disable the checkbox. Otherwise
	//					sets it to default and enables checkbox.
	//
	//	Programmer:		Nick Williams
	//
	//	Date:			09/05/13
	//
	//	Version:		1.2
	//
	//	Environment:	Hardware: Dell Studio 1747 Laptop
	//					Software: Microsoft Windows 7 Ultimate SP1
	//	
	//	Input:			item_rows
	//	
	//	Output:			Disables/enables checkbox
	//					Sets row to valid/invalid
	//
	//	Called By:		setInitialGrade
	//					calculateGrade
	//
	//	Calls:			N/A
	//
	//	Parameters:		N/A
	//
	//	Returns:		N/A
	//
	//	History Log:	09/05/13 NW First iteration
	//					09/06/13 NW Several fixes
	//					09/06/13 NW Cleaned up code
	//----------------------------------------------------------------------------
	var disableInvalidRows = function()
	{
		var item_rows = document.getElementsByClassName("gradeshop_item"),
			i = 0;
		
		for (i = 0; i < item_rows.length; i++)
		{
			var item = item_rows[i],
				item_checkbox = item.childNodes[CHECKBOX_EL_INDEX].firstChild,
				item_name = item.childNodes[NAME_EL_INDEX].textContent,
				item_cost = parseInt(item.childNodes[COST_EL_INDEX].textContent);
				
			if ((remaining_grade - item_cost) < 0
				&& item.className != "gradeshop_item selected")
			{
				item.className = "gradeshop_item invalid";
				item_checkbox.disabled = true;
			}
			else if (item.className == "gradeshop_item selected") {}
			else
			{
				item.className = "gradeshop_item";
				item_checkbox.disabled = false;
			}
		}
	}
//------------------------------------------------------------------------------
//	End GradeShop
//------------------------------------------------------------------------------
}

	//----------------------------------------------------------------------------
	//	Name:			resetChecks
	//
	//	Title:			Reset checkboxes
	//
	//	Description:	Loops through each gradeshop_item, finds the checkbox
	//					and sets it to false
	//
	//	Programmer:		Nick Williams
	//
	//	Date:			09/05/13
	//
	//	Version:		1.2
	//
	//	Environment:	Hardware: Dell Studio 1747 Laptop
	//					Software: Microsoft Windows 7 Ultimate SP1
	//	
	//	Input:			item_rows
	//	
	//	Output:			Disables checkboxes
	//
	//	Called By:		setInitialGrade
	//
	//	Calls:			N/A
	//
	//	Parameters:		N/A
	//
	//	Returns:		N/A
	//
	//	History Log:	09/05/13 NW First iteration
	//					09/06/13 NW Several fixes
	//					09/06/13 NW Cleaned up code
	//----------------------------------------------------------------------------
function resetChecks()
{
	var items = document.getElementsByClassName("gradeshop_item");
		i = 0;
		
	for (i = 0; i < items.length; i++)
	{
		var item = items[i],
			item_checkbox = item.childNodes[CHECKBOX_EL_INDEX].firstChild;
		
		item_checkbox.checked = false;
		item.className = "gradeshop_item";
	}
}

window.onload = resetChecks;