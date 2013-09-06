<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html lang="en" xml:lang="en" dir="ltr">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
			<title>Tales of Graces f Grade Shop Calculator</title>
			<link rel="stylesheet" type="text/css" href="gradeshop.css" />
			<script type="text/javascript" src="gradeshop.js"></script>
			<script type="text/javascript">
			var grade_shop = new GradeShop();
			</script>
		</head>
		<body>
			<h2>Tales of Graces f Grade Calculator</h2>
			<div id="setup">
				<div id="setup_left">
					<p><label>Initial Grade:</label> <input type="text" name="initial_grade" id="initial_grade" value="0" onkeyup="grade_shop.setInitialGrade(this.value); resetChecks();" onblur="grade_shop.setInitialGrade(this.value);" /></p>
				</div>
				<div id="setup_right">
					<p><label>Remaining Grade:</label> <input type="text" name="remaining_grade" id="remaining_grade" value="0" readonly="true" /></p>
				</div>
			</div>
			<div id="gradeshop_container">
				<div id="gradeshop_list_header">
					<div class="gradeshop_checkbox">X</div>
					<div class="gradeshop_name">Name</div>
					<div class="gradeshop_cost">Cost</div>
					<div class="gradeshop_description">Notes</div>
				</div>
				<xsl:for-each select="gradeshop/items/gradeshop_item">
					<div class="gradeshop_item">
						<div class="gradeshop_checkbox"><input type="checkbox" onchange="grade_shop.calculateGrade(this.parentNode.parentNode);" /></div>
						<div class="gradeshop_name"><xsl:value-of select="@name" /></div>
						<div class="gradeshop_cost"><xsl:value-of select="@cost" /></div>
						<div class="gradeshop_description"><xsl:value-of select="@notes" /></div>
					</div>
				</xsl:for-each>
			</div>
			<div id="summary">
				<h3><u>Summary</u></h3>
				<ul id="summary_list">
				</ul>
			</div>
			<div id="footer">
				<p>Copyright Sikuneh 2013</p>
			</div>
		</body>
	</html>
</xsl:template>

</xsl:stylesheet>