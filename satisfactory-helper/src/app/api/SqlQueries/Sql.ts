export const GetRecipeSql = `
SELECT 
	R.id as recipeId,
	IR.id as producedItemId, 
	IR.name as producedItemName, 
	R.producingPerMinute as PerMinute, 
	RC.itemId as consumptionItemId,
	IRC.name as consumptionItemName,
	RC.count as consumptionCount
FROM recipe R
	LEFT JOIN recipe_consumption RC ON R.id = RC.recipeId
	LEFT JOIN items IR ON R.producedId = IR.id
	LEFT JOIN items IRC ON RC.itemId = IRC.id
WHERE 1 = 1 `;