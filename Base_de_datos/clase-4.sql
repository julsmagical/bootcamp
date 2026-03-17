SELECT TOP (1000) [ProductID]
      ,[Name]
      ,[ProductNumber]
      ,[Color]
      ,[StandardCost]
      ,[ListPrice]
      ,[Size]
      ,[Weight]
      ,[ProductCategoryID]
      ,[ProductModelID]
      ,[SellStartDate]
      ,[SellEndDate]
      ,[DiscontinuedDate]
      ,[ThumbNailPhoto]
      ,[ThumbnailPhotoFileName]
      ,[rowguid]
      ,[ModifiedDate]
  FROM [AdventureWorksLT2022].[SalesLT].[Product]

  SELECT DISTINCT Color as product_color FROM SalesLT.Product
  WHERE Color IS NOT NULL

  ---
  DECLARE @PAGE_NUMBER INT = 1;
  DECLARE @ROWS_PER_PAGE INT = 10;

  SELECT * FROM SalesLT.ProductCategory
  ORDER BY Name desc
  OFFSET (@PAGE_NUMBER - 1) * @ROWS_PER_PAGE ROWS
  FETCH NEXT @ROWS_PER_PAGE ROWS ONLY;

  SELECT * FROM SalesLT.Customer
  ORDER BY CustomerID
  OFFSET (@PAGE_NUMBER - 1) * @ROWS_PER_PAGE ROWS
  FETCH NEXT @ROWS_PER_PAGE ROWS ONLY;

  -- todos con r
  SELECT * FROM SalesLT.Customer
  WHERE FirstName LIKE '%R%';

  -- busqueda especifica
   SELECT * FROM SalesLT.Customer
  WHERE FirstName = 'Robert';

  -- con between
  SELECT FirstName, LastName, ModifiedDate FROM SalesLT.Customer
  WHERE ModifiedDate BETWEEN '2006-01-01' AND '2007-01-01'

  -- count
  SELECT COUNT(*) AS TOTAL_CUSTOMERS FROM SalesLT.Customer

  SELECT * FROM SalesLT.SalesOrderHeader
  SELECT COUNT(*) FROM SalesLT.SalesOrderHeader
  SELECT DISTINCT COUNT(*) FROM SalesLT.SalesOrderHeader
  
  SELECT * FROM SalesLT.SalesOrderHeader
  ORDER BY AccountNumber

  -- agrupacion general sumando todos los valores de la tabla
  SELECT SUM(TotalDue) AS total_ventas FROM SalesLT.SalesOrderHeader

  -- group 
  SELECT ProductCategoryID AS CATEGORY_ID, COUNT(ProductCategoryID) AS TOTAL FROM SalesLT.Product
  GROUP BY ProductCategoryID
  ORDER BY total DESC

  SELECT * FROM SalesLT.Product p
  INNER JOIN SalesLT.ProductCategory pc
	ON p.ProductCategoryID = pc.ProductCategoryID

SELECT 
	soh.SalesOrderID SALES_ORDER_ID,
	c.FirstName CUSTOMER_FIRST_NAME
FROM SalesLT.SalesOrderHeader soh
INNER JOIN SalesLT.Customer c
	ON c.CustomerID = soh.CustomerID